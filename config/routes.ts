import component from "@/locales/en-US/component";
import { icons } from "antd/lib/image/PreviewGroup";
import path from "path";

export default [
	{
		path: '/user',
		layout: false,
		routes: [
			{
				path: '/user/login',
				layout: false,
				name: 'login',
				component: './user/Login',
			},
			{
				path: '/user',
				redirect: '/user/login',
			},
		],
	},

	///////////////////////////////////
	// DEFAULT MENU
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: './TrangChu',
		icon: 'HomeOutlined',
	},
	{
		path: '/gioi-thieu',
		name: 'About',
		component: './TienIch/GioiThieu',
		hideInMenu: true,
	},
	{
		path: '/random-user',
		name: 'RandomUser',
		component: './RandomUser',
		icon: 'ArrowsAltOutlined',
	},

	//random number
	{
		path: '/random-number',
		name: 'RandomNumber',
		component: './RandomNumber',
		icon: 'ArrowsAltOutlined',
	},

	// todo List
	{
		path: '/todo-list',
		name: 'TodoList',
		component: './TodoList',
		icon: 'CheckCircleOutlined',
	},

	//Oẳn tù tì
	{
		path: '/oan-tu-ti',
		name: 'OanTuTi',
		component: './OanTuTi',
		icon: 'ExperimentOutlined'
	},

	// Ngân hàng câu hỏi
	{
		path: '/ngan-hang-cau-hoi',
		name: 'Ngân Hàng Câu Hỏi',
		component: './NganHangCauHoi',
		icon: 'DatabaseOutlined'
	},

	// Profile Card Responsive
	{
		path: 'profile-card-responsive',
		name: 'Profile Card Responsive',
		component: './CardResponsive',
		icon: 'DatabaseOutlined',
	},
	// Quản lí lịch tập luyện cá nhân
	{
		path: '/quan-li-lich-tap-luyen-ca-nhan',
		name: 'Quản Lí Lịch Tập Luyện Cá Nhân',
		component: './QuanLiLichTapLuyenCaNhan',
		icon: 'DatabaseOutlined'
	},


	// DANH MUC HE THONG
	// {
	// 	name: 'DanhMuc',
	// 	path: '/danh-muc',
	// 	icon: 'copy',
	// 	routes: [
	// 		{
	// 			name: 'ChucVu',
	// 			path: 'chuc-vu',
	// 			component: './DanhMuc/ChucVu',
	// 		},
	// 	],
	// },

	{
		path: '/notification',
		routes: [
			{
				path: './subscribe',
				exact: true,
				component: './ThongBao/Subscribe',
			},
			{
				path: './check',
				exact: true,
				component: './ThongBao/Check',
			},
			{
				path: './',
				exact: true,
				component: './ThongBao/NotifOneSignal',
			},
		],
		layout: false,
		hideInMenu: true,
	},
	{
		path: '/',
	},
	{
		path: '/403',
		component: './exception/403/403Page',
		layout: false,
	},
	{
		path: '/hold-on',
		component: './exception/DangCapNhat',
		layout: false,
	},
	{
		component: './exception/404',
	},
];
