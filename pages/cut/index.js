import regeneratorRuntime from 'regenerator-runtime'
import computedBehavior from 'miniprogram-computed'
import sys from '../../utils/sys'
import * as utils from '../../utils/index'

const app = getApp()

Page({
	behaviors: [computedBehavior],

	canvas: null,

	data: {
		// 操作图片路径
		img: null,
		// 图片原始尺寸
		imageOriginSize: null,
		// imageOriginSize: {
		// 	width: null,
		// 	height: null,
		// },
		// 图片展示尺寸
		imageViewSize: null,
		// imageViewSize: {
		// 	width: null,
		// 	height: null,
		// },
		// 拖拽区域矩形信息
		handleBoxRect: {
			width: null,
			height: null,
			top: 0,
			left: 0,
		},

		maxSize: {
			w: 0,
			h: 0,
		},
	},

	computed: {
		editorBoxStyle(data){
			if(data.imageViewSize){
				const { width, height, } = data.imageViewSize;

				return `
					width: ${width}px;
					height: ${height}px;
				`;
			}
		},
		handleBoxStyle(data){
			if(data.imageViewSize){
				const { width, height, top, left, } = data.handleBoxRect;

				return `
					width: ${width}px;
					height: ${height}px;
					top: ${top}px;
					left: ${left}px;
				`;
			}
		},
	},

	onLoad(){
		// this.computedMaxEditorBoxArea();

		this.init('../../assets/imgs/img.jpg');
	},

	// 计算编辑区支持的最大容器尺寸
	async computedMaxEditorBoxArea(){
		return new Promise((resolve)=>{
			const query = wx.createSelectorQuery();
			query.select('.editor-box').boundingClientRect((rect)=>{
				resolve(rect);
			}).exec();
		})
	},

	async init(img){
		const rect = await this.computedMaxEditorBoxArea();
		this.setData({
			maxSize: {
				w: rect.width,
				h: rect.height,
			},
		})
		console.log('编辑区editor-box最大编辑尺寸：', rect);

		// const { img } = this.data;
		const res = await sys.getImageInfo({
			src: img,
		});

		this.setData({
			img,
			imageOriginSize: {
				width: res.width,
				height: res.height,
			},
		});

		// 计算完全展示的图片尺寸
		const size = utils.getCompressSize({
			limitWidth: rect.width,
			limitHeight: rect.height,
			width: res.width,
			height: res.height,
		});

		this.setData({
			imageViewSize: {
				width: size.width,
				height: size.height,
			},
			handleBoxRect: {
				width: size.width,
				height: size.height,
				top: 0,
				left: 0,
			},
		});

		console.log(size, 'size');
	}
})