// Supabase Configuration
const SUPABASE_URL = 'https://wlxxcsakhrbazpbzuppk.supabase.co';
const SUPABASE_ANON_KEY = 'GANTI_DENGAN_ANON_KEY_KAMU'; // Ganti ini dengan anon key dari dashboard

// Initialize Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Helper: Upload file to Supabase Storage
async function uploadFileToSupabase(file, folderPath = 'submissions') {
  try {
    const fileName = `${Date.now()}_${file.name}`;
    const filePath = `${folderPath}/${fileName}`;
    
    const { data, error } = await supabase.storage
      .from('tugas-files')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) throw error;

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('tugas-files')
      .getPublicUrl(filePath);

    return {
      success: true,
      path: filePath,
      url: urlData.publicUrl,
      name: file.name,
      size: file.size,
      type: file.type
    };
  } catch (error) {
    console.error('Upload error:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Helper: Delete file from Supabase Storage
async function deleteFileFromSupabase(filePath) {
  try {
    const { error } = await supabase.storage
      .from('tugas-files')
      .remove([filePath]);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Delete error:', error);
    return { success: false, error: error.message };
  }
}

// Helper: Save submission to database
async function saveSubmission(mkId, pertemuan, studentNim, note, files) {
  try {
    // Insert submission
    const { data: submission, error: subError } = await supabase
      .from('submissions')
      .insert({
        mk_id: mkId,
        pertemuan: pertemuan,
        student_nim: studentNim,
        note: note || null
      })
      .select()
      .single();

    if (subError) throw subError;

    // Insert files if any
    if (files && files.length > 0) {
      const fileRecords = files.map(f => ({
        submission_id: submission.id,
        file_name: f.name,
        file_size: f.size,
        file_type: f.type,
        file_url: f.url,
        storage_path: f.path
      }));

      const { error: filesError } = await supabase
        .from('submission_files')
        .insert(fileRecords);

      if (filesError) throw filesError;
    }

    return { success: true, data: submission };
  } catch (error) {
    console.error('Save submission error:', error);
    return { success: false, error: error.message };
  }
}

// Helper: Update submission
async function updateSubmission(submissionId, note, newFiles) {
  try {
    // Update note
    const { error: updateError } = await supabase
      .from('submissions')
      .update({ 
        note: note || null,
        updated_at: new Date().toISOString()
      })
      .eq('id', submissionId);

    if (updateError) throw updateError;

    // Insert new files if any
    if (newFiles && newFiles.length > 0) {
      const fileRecords = newFiles.map(f => ({
        submission_id: submissionId,
        file_name: f.name,
        file_size: f.size,
        file_type: f.type,
        file_url: f.url,
        storage_path: f.path
      }));

      const { error: filesError } = await supabase
        .from('submission_files')
        .insert(fileRecords);

      if (filesError) throw filesError;
    }

    return { success: true };
  } catch (error) {
    console.error('Update submission error:', error);
    return { success: false, error: error.message };
  }
}

// Helper: Get submissions by mk and pertemuan
async function getSubmission(mkId, pertemuan) {
  try {
    const { data, error } = await supabase
      .from('submissions')
      .select(`
        *,
        submission_files (*)
      `)
      .eq('mk_id', mkId)
      .eq('pertemuan', pertemuan)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return { success: true, data: null }; // Not found
      throw error;
    }

    return { success: true, data };
  } catch (error) {
    console.error('Get submission error:', error);
    return { success: false, error: error.message };
  }
}

// Helper: Get all submissions
async function getAllSubmissions() {
  try {
    const { data, error } = await supabase
      .from('submissions')
      .select(`
        *,
        submission_files (*)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return { success: true, data: data || [] };
  } catch (error) {
    console.error('Get all submissions error:', error);
    return { success: false, error: error.message };
  }
}

// Helper: Delete submission
async function deleteSubmission(submissionId) {
  try {
    // Get files to delete from storage
    const { data: files } = await supabase
      .from('submission_files')
      .select('storage_path')
      .eq('submission_id', submissionId);

    // Delete from storage
    if (files && files.length > 0) {
      const paths = files.map(f => f.storage_path);
      await supabase.storage.from('tugas-files').remove(paths);
    }

    // Delete submission (cascade will delete files records)
    const { error } = await supabase
      .from('submissions')
      .delete()
      .eq('id', submissionId);

    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error('Delete submission error:', error);
    return { success: false, error: error.message };
  }
}

// Helper: Delete mata kuliah and all submissions
async function deleteMataKuliah(mkId) {
  try {
    // Get all submissions for this mk
    const { data: submissions } = await supabase
      .from('submissions')
      .select('id')
      .eq('mk_id', mkId);

    // Delete each submission (will cascade delete files)
    if (submissions && submissions.length > 0) {
      for (const sub of submissions) {
        await deleteSubmission(sub.id);
      }
    }

    return { success: true };
  } catch (error) {
    console.error('Delete mata kuliah error:', error);
    return { success: false, error: error.message };
  }
}
