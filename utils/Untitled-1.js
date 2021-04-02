
const getCompressSize = (function(){
	/**图片最大不能超过500kb */
	const LIMIT_SIZE = 1024 * 500;
	/**图片最大宽度不能超过1080px */
	const LIMIT_WIDTH = 1080;
	/**图片最大高度不能超过1920px */
	const LIMIT_HEIGHT = 1920;

	return function({ size, width, height, type, }){
		let isCompressd = false;
		let compressWidth = width;
		let compressHeight = height;

		// 宽度是否超出限制
		if(width > LIMIT_WIDTH){
			const aspectRatio = width / LIMIT_WIDTH;
			compressWidth = LIMIT_WIDTH;
			compressHeight = Math.round(height / aspectRatio);

			// 如果等比例缩放后，高度还是超出限制，继续计算
			if(compressHeight > LIMIT_HEIGHT){
				const finalSize = _getCompressSize({
					size,
					width: compressWidth,
					height: compressHeight,
				});

				compressWidth = finalSize.width;
				compressHeight = finalSize.height;
			}

			isCompressd = true;
		}else if(height > LIMIT_HEIGHT){		// 高度是否超出限制
			// 按照实际高度和最大高度比例，等比例缩放宽度
			const aspectRatio = height / LIMIT_HEIGHT;
			compressWidth = Math.round(width / aspectRatio);
			compressHeight = LIMIT_HEIGHT;

			// 如果等比例缩放后，宽度还是超出限制，继续计算
			if(compressWidth > LIMIT_WIDTH){
				  const finalSize = _getCompressSize({
					size,
					width: compressWidth,
					height: compressHeight,
				});

				compressWidth = finalSize.width;
				compressHeight = finalSize.height;
			}

			isCompressd = true;
		}else if(size > LIMIT_SIZE || type == 'png'){
			// 宽度和高度都没超出限制，但文件大小超出范围
			isCompressd = true;
		}

		return {
			isCompressd,
			width: compressWidth,
			height: compressHeight,
		}
	}
})();


const ret = getCompressSize({
	size: 100,
	width: 1920,
	height: 1080,
});

console.log(ret, 'ret');