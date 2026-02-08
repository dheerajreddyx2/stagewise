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

async function addTransformation() {
    try {
        console.log('Starting image upload process...\n');

        // Upload before image
        const beforeImagePath = path.join(__dirname, 'public', 'kitchen_before.png');
        const beforeUrl = await uploadImage(beforeImagePath, 'before');

        // Upload after image
        const afterImagePath = path.join(__dirname, 'public', 'kitchen_after.png');
        const afterUrl = await uploadImage(afterImagePath, 'after');

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
                title: 'Modern Indian Kitchen Transformation',
                before_image_url: beforeUrl,
                after_image_url: afterUrl,
                room_type: 'Kitchen',
                display_order: nextDisplayOrder,
                is_active: true,
            }])
            .select();

        if (error) {
            throw error;
        }

        console.log('✓ Transformation added successfully!');
        console.log('\nTransformation details:');
        console.log('- Title: Modern Indian Kitchen Transformation');
        console.log('- Room Type: Kitchen');
        console.log('- Display Order:', nextDisplayOrder);
        console.log('- Status: Active');
        console.log('\nYou can now view it in the gallery at http://localhost:5173/gallery');
    } catch (error) {
        console.error('\n❌ Error:', error.message || error);
        process.exit(1);
    }
}

addTransformation();
