const generateUniqueId = async () => {
  try {
    let uniqueId = localStorage.getItem('uniqueId');
    if (!uniqueId) {
      const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        throw new Error('Failed to generate unique ID');
      }

      uniqueId = await response.text();

      localStorage.setItem('uniqueId', uniqueId);
    }

    return uniqueId;
  } catch (error) {
    console.error('Error generating unique ID:', error);
  }
};

document.addEventListener('DOMContentLoaded', async () => {
  const appID = await generateUniqueId();
});
