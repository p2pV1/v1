// import { useState } from "react";
// import Dropzone from "react-dropzone";

// import { ProgressBar, Step } from "react-step-progress-bar";
// import "react-step-progress-bar/styles.css";

// function Uploadfile() {
//   const [files, setFiles] = useState([]);

//   const handleUpload = (acceptedFiles) => {
//     // You can handle file uploads here
//     // For demonstration purposes, we'll use a timeout to simulate an upload
//     const totalFiles = acceptedFiles.length;
//     let uploadedFiles = 0;

//     acceptedFiles.forEach((file) => {
//       const reader = new FileReader();

//       reader.onload = () => {
//         // Simulate an upload with a timeout
//         setTimeout(() => {
//           uploadedFiles++;
//           const currentProgress = (uploadedFiles / totalFiles) * 100;

//           // If all files are uploaded, reset files array
//           if (uploadedFiles === totalFiles) {
//             setFiles([]);
//           }
//         }, 1000); // Simulate a 1-second upload delay
//       };

//       reader.readAsDataURL(file);
//     });

//     // Add uploaded files to the files array (for displaying file names)
//     setFiles([...files, ...acceptedFiles]);
//   };
//   return (
//     <div className="flex items-center justify-center sm:max-w-lg mx-auto">
//       {/* <label
//         for="dropzone-file"
//         className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100  "
//       >
//         <div className="flex flex-col items-center justify-center pt-5 pb-6">
//           <svg
//             className="w-8 h-8 mb-4 text-gray-500 "
//             aria-hidden="true"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 20 16"
//           >
//             <path
//               stroke="currentColor"
//               stroke-linecap="round"
//               stroke-linejoin="round"
//               stroke-width="2"
//               d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
//             />
//           </svg>
//           <p className="mb-2 text-sm text-gray-500 ">
//             <span className="font-semibold">Click to upload</span> or drag and
//             drop
//           </p>
//           <p className="text-xs text-gray-500 ">
//             SVG, PNG, JPG or GIF (MAX. 800x400px)
//           </p>
//         </div>
//         <input id="dropzone-file" type="file" className="hidden" />
//       </label> */}
//       <div>
//         <h2>File Upload with Step Progress Bar</h2>
//         <Dropzone onDrop={handleUpload}>
//           {({ getRootProps, getInputProps }) => (
//             <div {...getRootProps()} className="dropzone">
//               <input {...getInputProps()} />
//               <p>Drag 'n' drop some files here, or click to select files</p>
//             </div>
//           )}
//         </Dropzone>
//         <div className="uploaded-files">
//           <h3>Uploaded Files:</h3>
//           <ul>
//             {files.map((file, index) => (
//               <li key={index}>{file.name}</li>
//             ))}
//           </ul>
//         </div>
//         <div className="progress-bar">
//           <ProgressBar percent={Math.min(100, (files.length / 3) * 100)} />
//           <Step transition="scale">
//             {({ accomplished }) => (
//               <img
//                 style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
//                 width="30"
//                 src="https://icons.iconarchive.com/icons/custom-icon-design/mono-general-2/512/step-forward-icon.png"
//                 alt="step"
//               />
//             )}
//           </Step>
//           <Step transition="scale">
//             {({ accomplished }) => (
//               <img
//                 style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
//                 width="30"
//                 src="https://icons.iconarchive.com/icons/custom-icon-design/mono-general-2/512/step-forward-icon.png"
//                 alt="step"
//               />
//             )}
//           </Step>
//           <Step transition="scale">
//             {({ accomplished }) => (
//               <img
//                 style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
//                 width="30"
//                 src="https://icons.iconarchive.com/icons/custom-icon-design/mono-general-2/512/step-forward-icon.png"
//                 alt="step"
//               />
//             )}
//           </Step>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Uploadfile;
