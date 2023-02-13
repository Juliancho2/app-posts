
const avatarGenerate = async (name, lastname) => {
    try {
        const result = await fetch(
            `https://ui-avatars.com/api/?name=${name}+${lastname}&background=0D8ABC&color=fff&rounded=true
        `
        )
        return result.url
    } catch (error) {
        console.log(error)
    }

}

export { avatarGenerate }
