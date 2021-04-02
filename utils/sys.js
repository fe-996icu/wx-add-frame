
export function getImageInfo(options){
	return new Promise((resolve, reject)=>{
		wx.getImageInfo({
			src: options.src,
			success(res){
				resolve(res);
			},
			fail(err){
				reject(err);
			},
		});
	});
}

export default {
	getImageInfo,
};