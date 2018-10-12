var data = {
    resTabs: {
        code: 0,
        msg: '',
        data: [
            { id:0, name: "所有图片", type: "all" },
            { id: 123, name: "我我我", type: "user" },
            { id: 11, name: "我我我信息", type: "info" },
            {
                id:100, 
                name: "我我我分类",
                type: "group" ,
                children: [{ id: 123, name: "分组1", class: 'active' }, { id: 345, name: "分组222" }, { id: 456, name: "分组333" }]
            },
            { 
                id:1100,
                name: "我信息分类",
                type: "infoGroup" ,
                children: [{ id: 123, name: "信息分组1" }, { id: 345, name: "信息分组222" }, { id: 456, name: "信息分组333" }]
            }
        ]
    },
    resImgs: {
        code: 0,
        msg: '',
        data: {
            pageindex: 12,
            pagesize: 14,
            pagetotal: 150,
            items: [
                {
                    id: 1,
                    title: '1',
                    desc: '',
                    url: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4109912403,3780219094&fm=27&gp=0.jpg'
                },
                {
                    id: 2,
                    title: 'test, img 1',
                    desc: '',
                    url: 'https://img.qunba.com/69eb30811bfc47ec93a35d5c940b0472.png'
                },
                {
                    id: 3,
                    title: 'test, img 1',
                    desc: '',
                    url: 'https://img.qunba.com/dca03c4306dc439fb26cb044e2c1e240.png'
                },
                {
                    id: 4,
                    title: 'test, img 1',
                    desc: '',
                    url: 'https://img.qunba.com/bfcbf6bc860340e083201a9bd5f870b7.png'
                },
                {
                    id: 5,
                    title: 'test, img 1',
                    desc: '',
                    url: 'https://img.qunba.com/2739bb0f52004b328d379c95a25899f5.png'
                },
                {
                    id: 6,
                    title: 'test, img 1',
                    desc: '',
                    url: 'https://img.qunba.com/7a547a725bcf478dbac96cec925327a1.png'
                },
                {
                    id: 7,
                    title: 'test, img 1 his is a wider card with supporting text below as a natural lead-in to additional content. This content ',
                    desc: '',
                    url: 'https://img.qunba.com/4d49e31e2a514eb788483422f7c2c4bd.png'
                }              
            ]
        }
    },
    resTabImgs: {
        code: 0,
        msg: '',
        data: {
            pageindex: 1,
            pagesize: 14,
            pagetotal: 15,
            items: [
                {
                    id: 1,
                    title: '1',
                    desc: '',
                    url: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4109912403,3780219094&fm=27&gp=0.jpg'
                },
                {
                    id: 2,
                    title: 'test, img 1',
                    desc: '',
                    url: 'https://img.qunba.com/69eb30811bfc47ec93a35d5c940b0472.png'
                }    
            ]
        }
    },
    resAdd: {
        code: 0,
        msg: '',
        data: {
            id: 1111,
            title: 'test, img 1',
            desc: '',
            url: 'https://img.qunba.com/21d7fdeedd814ba58339390005cc0b46.png',
        }
    }
}