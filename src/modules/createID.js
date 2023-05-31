
const onPageLoad = async () => {
    
    const generateUniqueId = () => {
      let uniqueId = localStorage.getItem('uniqueId');
      if (!uniqueId) {
        
        uniqueId = Math.random().toString(36).slice(2, 11);
        
        localStorage.setItem('uniqueId', uniqueId);
      }
      return uniqueId;
    };

    generateUniqueId();

};

document.addEventListener('DOMContentLoaded', onPageLoad);