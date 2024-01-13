// import React from "react";
// import { useParams } from "react-router-dom";
// import { useSelector } from "react-redux";

// import ContentWrapper from "../../components/ContentWrapper";
// import useFetch from "../../hook/useFetch";
// import Img from "../../components/lazyLoadImg/Img";
// import PosterFallBack from "../../assets/no-poster.png";
// const Images = () => {
//   const { mediaType, id } = useParams();
//   const { data, loading } = useFetch(`/${mediaType}/${id}/images`);
//   const { url } = useSelector((state) => state.home);
//   const backdropArr = data?.backdrops || [];
//   const posterArr = data?.posters || [];
//   console.log(posterArr);
//   const mergeArrays = [...backdropArr, ...posterArr];
//   console.log("mergeArr: ", mergeArrays);
//   console.log(data);
//   return (
//     <div className="relative mb-[50px]">
//       {data && (
//         <ContentWrapper>
//           <div className="text-white text-2xl mb-6">Images</div>
//           {!loading ? (
//             <div className=" flex gap-2 overflow-x-auto py-2">
//               {mergeArrays.map((imge, index) => {
//                 let imgUrl = imge.file_path
//                   ? url.backdrop + imge.file_path
//                   : "";
//                 return (
//                   <div className="w-[150px] shrink-0 md:w-[25%]" key={index}>
//                     <Img src={imgUrl} />
//                   </div>
//                 );
//               })}
//             </div>
//           ) : (
//             <div className="text-base text-white">Loading.....</div>
//           )}
//         </ContentWrapper>
//       )}
//     </div>
//   );
// };

// export default Images;
