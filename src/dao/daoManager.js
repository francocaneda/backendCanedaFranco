export const getmessageManagers = async () => {
    const modelMessage = process.env.DBSELECTION == 1 ? await import('./MongoDB/models/Message.js') :
        await import('./Postgresql/models/Message.js')
    return modelMessage
}

export const getproductManagers = async () => {
    const modelProduct = process.env.DBSELECTION == 1 ? await import('./MongoDB/models/Product.js') :
        await import('./Postgresql/models/Product.js')

    return modelProduct
}

export const getcartManagers = async () => {
    const modelCart = process.env.DBSELECTION == 1 ? await import('./MongoDB/models/Cart.js') :
        await import('./Postgresql/models/Cart.js')

    return modelCart
}