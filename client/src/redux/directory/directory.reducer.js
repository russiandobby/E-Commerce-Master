const INITIAL_STATE = {
    sections:[
        {
            title: 'hats',
            imageUrl: 'https://i.ibb.co/t2PWW3q/hats-woman1.jpg',
            id: 1,
            linkUrl: 'shop/hats'
          },
          {
            title: 'jackets',
            imageUrl: 'https://i.ibb.co/phgh2zd/jackets-woman1.jpg',
            id: 2,
            linkUrl: 'shop/jackets'
          },
          {
            title: 'sneakers',
            imageUrl: 'https://i.ibb.co/GVcysZN/sneakers-main.jpg',
            id: 3,
            linkUrl: 'shop/sneakers'
          },
          {
            title: 'womens',
            imageUrl: 'https://i.ibb.co/j3K8xd7/woman-main.jpg',
            size: 'large',
            id: 4,
            linkUrl: 'shop/womens'
          },
          {
            title: 'mens',
            imageUrl: 'https://i.ibb.co/RzT06BJ/man-main.jpg',
            size: 'large',
            id: 5,
            linkUrl: 'shop/mens'
          },
          {
            title: 'watches',
            imageUrl: 'https://i.ibb.co/MVWdXnD/watches-main.jpg',
            size: 'large',
            id: 6,
            linkUrl: 'shop/watches'
          }
    ]
}

const directoryReducer = (state = INITIAL_STATE, action)=>{
    switch(action.type){
        default:
            return state;
    }
};

export default directoryReducer;