
const getCompressSize = (function(){
	/**图片最大宽度不能超过1080px */
	const LIMIT_WIDTH = 335;
	/**图片最大高度不能超过1920px */
	const LIMIT_HEIGHT = 483;

	return function({ width, height, limitWidth=LIMIT_WIDTH, limitHeight=LIMIT_HEIGHT }){
		let compressWidth = width;
		let compressHeight = height;

		// 宽度是否超出限制
		if(width > limitWidth){
			const aspectRatio = width / limitWidth;
			compressWidth = limitWidth;
			compressHeight = Math.round(height / aspectRatio);

			// 如果等比例缩放后，高度还是超出限制，继续计算
			if(compressHeight > limitHeight){
				const finalSize = getCompressSize({
					width: compressWidth,
					height: compressHeight,
				});

				compressWidth = finalSize.width;
				compressHeight = finalSize.height;
			}
		}else if(height > limitHeight){		// 高度是否超出限制
			// 按照实际高度和最大高度比例，等比例缩放宽度
			const aspectRatio = height / limitHeight;
			compressWidth = Math.round(width / aspectRatio);
			compressHeight = limitHeight;

			// 如果等比例缩放后，宽度还是超出限制，继续计算
			if(compressWidth > limitWidth){
				  const finalSize = getCompressSize({
					width: compressWidth,
					height: compressHeight,
				});

				compressWidth = finalSize.width;
				compressHeight = finalSize.height;
			}
		}

		return {
			width: compressWidth,
			height: compressHeight,
		}
	}
})();

// const ret = getCompressSize({
// 	width: 750,
// 	height: 1334,
// });

// console.log(ret, 'ret');


export {
	getCompressSize,
}