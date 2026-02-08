import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Supabase configuration
const supabaseUrl = 'https://dsxtflwqlcwgmfnsarah.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzeHRmbHdxbGN3Z21mbnNhcmFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg1NDQ3MzgsImV4cCI6MjA4NDEyMDczOH0.eif-sPM9WeLZbbokUR2I-Sm2mcCuUdutiEkoAceMGv4';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function uploadImage(filePath, type) {
    try {
        const fileBuffer = fs.readFileSync(filePath);
        const fileName = `${Date.now()}-${type}-${Math.random().toString(36).substring(7)}.png`;
        const uploadPath = `transformations/${fileName}`;

        console.log(`Uploading ${type} image...`);
        const { error: uploadError } = await supabase.storage
            .from('stagewise-images')
            .upload(uploadPath, fileBuffer, {
                contentType: 'image/png',
                upsert: false
            });

        if (uploadError) {
            throw uploadError;
        }

        const { data } = supabase.storage
            .from('stagewise-images')
            .getPublicUrl(uploadPath);

        console.log(`✓ ${type} image uploaded: ${data.publicUrl}`);
        return data.publicUrl;
    } catch (error) {
        console.error(`Error uploading ${type} image:`, error);
        throw error;
    }
}

async function addTransformation(title, roomType, beforePath, afterPath) {
    try {
        // Upload before image
        const beforeUrl = await uploadImage(beforePath, 'before');

        // Upload after image
        const afterUrl = await uploadImage(afterPath, 'after');

        // Get the current highest display order
        const { data: existingTransformations } = await supabase
            .from('transformations')
            .select('display_order')
            .order('display_order', { ascending: false })
            .limit(1);

        const nextDisplayOrder = existingTransformations && existingTransformations.length > 0
            ? existingTransformations[0].display_order + 1
            : 1;

        // Insert into transformations table
        console.log('\nAdding transformation to database...');
        const { data, error } = await supabase
            .from('transformations')
            .insert([{
                title: title,
                before_image_url: beforeUrl,
                after_image_url: afterUrl,
                room_type: roomType,
                display_order: nextDisplayOrder,
                is_active: true,
            }])
            .select();

        if (error) {
            throw error;
        }

        console.log(`✓ ${title} added successfully!`);
        return data;
    } catch (error) {
        console.error(`\n❌ Error adding ${title}:`, error.message || error);
        throw error;
    }
}

async function uploadAllTransformations() {
    try {
        console.log('='.repeat(60));
        console.log('Starting batch upload of transformations...\n');

        // Upload Kitchen Transformation
        console.log('1. KITCHEN TRANSFORMATION');
        console.log('-'.repeat(60));
        const kitchenBeforePath = path.join(__dirname, 'public', 'kitchen_before.png');
        const kitchenAfterPath = path.join(__dirname, 'public', 'kitchen_after.png');
        await addTransformation(
            'Modern Indian Kitchen Transformation',
            'Kitchen',
            kitchenBeforePath,
            kitchenAfterPath
        );

        console.log('\n');

        // Upload Bachelor Room Transformation
        console.log('2. BACHELOR ROOM TRANSFORMATION');
        console.log('-'.repeat(60));
        const bachelorBeforePath = path.join(__dirname, 'public', 'bachelor_room_before.png');
        const bachelorAfterPath = path.join(__dirname, 'public', 'bachelor_room_after.png');
        await addTransformation(
            'Modern Bachelor Room Transformation',
            'Bedroom',
            bachelorBeforePath,
            bachelorAfterPath
        );

        console.log('\n' + '='.repeat(60));
        console.log('✅ All transformations uploaded successfully!');
        console.log('='.repeat(60));
        console.log('\nYou can now view them in the gallery at:');
        console.log('http://localhost:5173/gallery');
    } catch (error) {
        console.error('\n❌ Upload failed:', error.message || error);
        console.log('\n⚠️  Due to Supabase permissions, please upload manually via the admin dashboard.');
        console.log('Visit: http://localhost:5173/admin');
        process.exit(1);
    }
}

uploadAllTransformations();
