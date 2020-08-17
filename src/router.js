import Vue from 'vue';
import Router from 'vue-router';

import Home from './components/Home';
import ChatSpace from './components/ChatSpace';
import SpaceLogin from './components/SpaceLogin';
import CreateSpace from './components/CreateSpace';
import CreateSpace1 from './components/CreateSpace1';
import CreateSpace2 from './components/CreateSpace2';

export default new Router({
	routes:[
		{
			path:'/space',
			component:ChatSpace,
		},

		{
			path:'/space/join',
			component:SpaceLogin
		},

		{
			path:'/space/create',
			component:CreateSpace,
			children:[
				{
					path:"1",
					component:CreateSpace1
				},
				{
					path:"2",
					component:CreateSpace2
				}
			]
		},

		{
			path:'/',
			component:Home
		}
	],
	mode:'history'
})
