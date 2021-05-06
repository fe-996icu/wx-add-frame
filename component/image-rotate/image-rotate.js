/*图片旋转组件
 * @Author: zhangjianzhong
 * @Date: 2021-05-01 15:23:50
 * @Last Modified by: zhangjianzhong
 * @Last Modified time: 2021-05-01 16:37:56
 */
import regeneratorRuntime from 'regenerator-runtime'
import computedBehavior from 'miniprogram-computed'

// component/image-rotate/image-rotate.js
Component({
	behaviors: [computedBehavior],


	/**
	 * 组件的属性列表
	 */
	properties: {
		src: {
			type: String,
			observer(){

			},
		},
		rectLocation: {
			type: Object,
		},
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		angle: 0,
		canvasStyle: null,
	},

	computed: {
		viewImageStyle(data){
			if(data.rectLocation){
				const { width, height, top, left, } = data.rectLocation;

				return `
					width: ${width}rpx;
					height: ${height}rpx;
					top: ${top}rpx;
					left: ${left}rpx;
					transform: rotate(${data.angle}deg);
				`;
			}
		},
	},

	// lifetimes: {
	// 	attached(){
	// 		setInterval(()=>{
	// 			this.getImagePath();
	// 		}, 2000);
	// 	},
	// },

	/**
	 * 组件的方法列表
	 */
	methods: {
		// 旋转图片，angle=0，恢复默认角度，否则累加图片旋转角度
		setRotate(angle){
			angle = angle == 0 ? 0 : this.data.angle + (angle - 0);

			this.setData({
				angle,
			});
		},

		async getImagePath(){
			return new Promise(async (resolve, reject)=>{

				const rect = await this.getImageRect();

				this.setData({
					canvasStyle: `
						width: ${rect.width}px;
						height: ${rect.height}px;
					`,
				});

				const ctx = wx.createCanvasContext('myCanvas', this);
				wx.getImageInfo({
					src: this.data.src,
					success: (res)=>{
						// 设置原图信息
						let originalImageInfo = res
// debugger
						let oWoHRate = originalImageInfo.width / originalImageInfo.height
						let max = 4000
						let canvas
						if (originalImageInfo.width >= originalImageInfo.height) {
							canvas = {
								width: originalImageInfo.width > max ? max : originalImageInfo.width,
								height: originalImageInfo.width > max ? max / oWoHRate : originalImageInfo.height
							}
						} else {
							canvas = {
								width: originalImageInfo.height > max ? max * oWoHRate : originalImageInfo.width,
								height: originalImageInfo.height > max ? max : originalImageInfo.height
							}
						}
						const angle = this.data.angle % 360;

						if(angle == 0){
							ctx.translate(0,0)
							ctx.rotate(0*Math.PI/180)
						}else if(angle == 90){
							// 90度
							canvas = {
								width: originalImageInfo.height,
								height: originalImageInfo.width
							};
							ctx.translate(originalImageInfo.height,0)
							ctx.rotate(90*Math.PI/180)
						}else if(angle == 180){
							// 180度
							ctx.translate(originalImageInfo.width,originalImageInfo.height)
							ctx.rotate(180*Math.PI/180)
						}else if(angle == 270){
							// 270度
							canvas = {
								width: originalImageInfo.height,
								height: originalImageInfo.width
							};
							ctx.translate(0,originalImageInfo.width)
							ctx.rotate(270*Math.PI/180)
						}
debugger
						//            原图路径                       原图宽                   原图高                       canvas宽     canvas高
						// ctx.drawImage(originalImageInfo.path, 0, 0, originalImageInfo.width, originalImageInfo.height, 0, 0, canvas.width, canvas.height);
						// ctx.drawImage(originalImageInfo.path, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
						ctx.drawImage(originalImageInfo.path, 0, 0, canvas.width, canvas.height, 0, 0, canvas.height, canvas.width);
						ctx.draw(false)

						//   wx.previewImage({
						//   urls: [originalImageInfo.path]
						// urls: ['../../assets/imgs/img.jpg']
						//   })
// debugger
						// this._exportCanvasImage({
						// 	// canvas截图的尺寸
						// 	width: canvas.width,
						// 	height: canvas.height,
						// }).then(v=>resolve(v));


						wx.hideLoading()
					},
					fail() {
						wx.hideLoading()
					}
				})
			});

		},

		getImageRect(){
			return new Promise((resolve)=>{
				const query = this.createSelectorQuery();
				query.select('.view-image').boundingClientRect();

				query.exec(([rect])=>{
					resolve(rect);
				});
			});
		},
		/**导出canvas中的图片 */
		_exportCanvasImage(options){
			return new Promise((resolve, rejct)=>{
				wx.showLoading({
					title: '请稍后',
					mask: true
				})

				setTimeout(() => {
					const {
						// canvas截图的开始坐标点
						x=0,
						y=0,
						// canvas截图的尺寸
						width,
						height,
					} = options;

					wx.canvasToTempFilePath({
						x,
						y,
						width,
						height,
						destWidth: width,
						destHeight: height,
						canvasId: 'myCanvas',
						fileType: 'png',
						quality: 1,
						success(res) {
							wx.hideLoading()
							resolve(res.tempFilePath);
						},
						fail(err) {
							console.log(err)
							wx.hideLoading()
							reject(err);
						},
					}, this)
				}, 100) //延迟时间 这里是0.1秒
			});
		},
	},
})