// import axios from 'axios';
//
// const apiKey = '645f9baa9ada4f18c05d90c2526108a7';
//
// const getLinkPreview = async (url) => {
//     try {
//         const response = await axios.get(`https://api.linkpreview.net/?key=${apiKey}&q=${encodeURIComponent(url)}`);
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching link preview:', error);
//         return null;
//     }
// };
//
// // Sử dụng hàm getLinkPreview để kiểm tra thông tin trả về của link
// const testLinkPreview = async () => {
//     const url = 'https://www.youtube.com/';
//     const preview = await getLinkPreview(url);
//     console.log('Web Preview:', preview);
// };
//
// testLinkPreview();
