export const uploadToCloudinary = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'gorun_ltd'); // Tomar dewa preset
  
  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/ddziennkh/image/upload`, {
      method: 'POST',
      body: formData
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error.message || 'Upload failed');
    }

    const data = await res.json();
    return data.secure_url; // Eita Firestore-e save hobe
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw error;
  }
};