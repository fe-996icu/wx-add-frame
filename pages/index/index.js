// 裁切对象
var cropper
Page({
	/**
	 * 页面的初始数据
	 */
	data: {},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		options.imagePath = '../../assets/imgs/img.jpg';
		// 根据标签id，获取到image-cropper对象，存储在全局变量cropper中
		cropper = this.selectComponent("#my-cropper");

		// 设置标签属性
		this.setData({
			src: options.imagePath,
		})
	},
	btn5() {
		// 调用image-cropper对象的getResults函数，获取裁剪参数
		cropper.getResults(res => {
			console.log(res)
		})
	},
	btn6() {
		// 调用image-cropper对象的getImagePath函数，获取裁剪后图片的地址
		cropper.getImagePath(res => {
			console.log(res)
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