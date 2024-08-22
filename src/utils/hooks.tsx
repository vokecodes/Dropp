import { useEffect, useRef } from 'react'

const Draggable = () => {
//     const ref = useRef(null)

//     useEffect(() => {
//         let startY: any;
//         let startX: any;
//         let scrollLeft: any;
//         let scrollTop: any;
//         let isDown: any;
    
//         ref.current.scrollLeft += 1000;
        
//         function mouseIsDown(e: MouseEvent){
//           console.log('first1')
//           isDown = true;
//           startY = e.pageY - ref.current.offsetTop;
//           startX = e.pageX - ref.current.offsetLeft;
//           scrollLeft = ref.current.scrollLeft;
//           scrollTop = ref.current.scrollTop; 
//           // console.log('e= ', e.target.pageX, e.currentTarget.pageX)
//         }
    
//         function mouseUp(e: MouseEvent){
//           console.log('first2')
//           isDown = false;
//         }
    
//         function mouseLeave(e: MouseEvent){
//           console.log('first3')
//           isDown = false;
//         }
    
//         function mouseMove(e: MouseEvent){
//           if(isDown){
//             e.preventDefault();
//             //Move vertcally
//             const y = e.pageY - ref.current.offsetTop;
//             const walkY = y - startY;
//             ref.current.scrollTop = scrollTop - walkY;
            
//             //Move Horizontally
//             const x = e.pageX - ref.current.offsetLeft;
//             const walkX = x - startX;
//             ref.current.scrollLeft = scrollLeft - walkX;
//             console.log('first4', y, x, walkY, walkX)
//           }
//         }
    
//         ref.current.addEventListener('mousedown', mouseIsDown);  
//         ref.current.addEventListener('mouseup', mouseUp)
//         ref.current.addEventListener('mouseleave', mouseLeave);
//         ref.current.addEventListener('mousemove', mouseMove);
    
//         return () => {
//           ref?.current?.removeEventListener("mousedown", mouseIsDown);
//           ref?.current?.removeEventListener("mouseup", mouseUp);
//           ref?.current?.removeEventListener("mouseleave", mouseLeave);
//           ref?.current?.removeEventListener("mousemove", mouseMove);
//         };
//       }, [ref])
//   return [ref]
}

export default Draggable