import regeneratorRuntime from 'regenerator-runtime'
import computedBehavior from 'miniprogram-computed'

// 裁切对象
var _cropper
Page({
	behaviors: [computedBehavior],

	/**
	 * 页面的初始数据
	 */
	data: {
		imageRectLocation: null,
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		// options.imagePath = '../../assets/imgs/img.jpg';
		options.imagePath = 'https://www.baidu.com/img/flexible/logo/pc/result.png'
		// options.imagePath = 'http://127.0.0.1:5500/IMG_0002.jpg'
		// 根据标签id，获取到image-cropper对象，存储在全局变量cropper中
		_cropper = this.selectComponent("#my-cropper");

		// 设置标签属性
		this.setData({
			src: options.imagePath,
		})
	},

	computed: {
		viewImageStyle(data){
			if(data.imageRectLocation){
				const { width, height, top, left, } = data.imageRectLocation;

				return `
					width: ${width}rpx;
					height: ${height}rpx;
					top: ${top}rpx;
					left: ${left}rpx;
				`;
			}
		},
	},

	onImageSizeInit(data){
		console.log('size', data.detail);

		this.setData({
			imageRectLocation: data.detail
		});
	},

	async onRotate(ev){
		const { num } = ev.target.dataset;
		// const path = await _cropper.setRotate(num-0);

		// console.log(path)
		// // wx.previewImage({
		// // 	urls: [path]
		// // });


		// this.setData({
		// 	src: path
		// });
		const comp = this.selectComponent('#imgRotate');
		comp.setRotate(num);
	},
	async onHorizontalReverse(){
		const comp = this.selectComponent('#imgRotate');
		const path = await comp.getImagePath();

		wx.previewImage({
			urls: [path]
		});
	},
	onVerticalReverse(){
		this.onHorizontalReverse();
	},

	btn5() {
		// 调用image-cropper对象的getResults函数，获取裁剪参数
		_cropper.getResults(res => {
			console.log(res)
		})
	},
	btn6() {
		this.btn5();

		// 调用image-cropper对象的getImagePath函数，获取裁剪后图片的地址
		_cropper.getImagePath(res => {
			console.log(res)

			wx.previewImage({
				urls: [res.path]
			})

			wx.saveImageToPhotosAlbum({
				filePath: res.path,
			});
		})
	},
	onChoose(){
		wx.chooseImage({
			success: (res)=>{
				console.log('选图结果：', res)

				this.setData({
					src: res.tempFilePaths[0],
				});
			},
		});
	},
})