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
			aspectRatio: 1,
			isProportion: true,
			quality: 1
		})
	},
	btn1(e) {
		// 图片宽高比值
		this.setData({
			aspectRatio: e.detail.value.toFixed(1)
		})
	},
	btn2(e) {
		// 图片质量
		this.setData({
			quality: e.detail.value.toFixed(1)
		})
	},
	btn3() {
		// 打开等比缩放
		this.setData({
			isProportion: true
		})
	},
	btn4() {
		// 关闭等比缩放
		this.setData({
			isProportion: false
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
	}
})