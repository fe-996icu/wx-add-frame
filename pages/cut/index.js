import regeneratorRuntime from 'regenerator-runtime'
import computedBehavior from 'miniprogram-computed'
import sys from '../../utils/sys'

const app = getApp()

Page({
	behaviors: [computedBehavior],

	canvas: null,

	data: {
		img: '../../assets/imgs/img.png',
		imgSize: {
			w: 0,
			h: 0,
		},

		maxSize: {
			w: 0,
			h: 0,
		},
		aa: 'abc'
	},

	computed: {
		editorBoxStyle(data){
			const { w, h } = data.imgSize;

			return `
				width: ${w}px;
				height: ${h}px;
			`;
		},
	},

	onLoad(){
		this.init();
	},

	async init(){
		const { img } = this.data;
		const res = await sys.getImageInfo({
			src: img,
		});

		this.setData({
			imgSize: {
				w: res.width,
				h: res.height,
			},
		});

		const query = wx.createSelectorQuery();
		query.select('.operate-area').boundingClientRect((rect)=>{
			this.setData({
				maxSize: {
					w: rect.width,
					h: rect.height,
				},
			});
		}).exec();
	}
})