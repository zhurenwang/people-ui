/**
 * H5复制
 * @param {string} content 要复制的字符串
 */
function h5Copy(content) {
	return new Promise((resolve, reject) => {
		let input = document.createElement("input")
		input.value = content
		input.readOnly = "readOnly"
		document.body.appendChild(input)
		input.select() // 选择对象
		input.setSelectionRange(0, content.length) //核心
		let result = document.execCommand("Copy") // 执行浏览器复制命令
		input.remove()
		if (result) {
			resolve()
		} else {
			reject()
		}
	})
}

/**
 * uniapp 复制
 * @param {string} content 要复制的字符串
 */
function uniappCopy(content) {
	return new Promise((resolve, reject) => {
		uni.setClipboardData({
			data: content,
			success: () => {
				resolve()
			},
			fail: () => {
				reject()
			}
		})
	})
}

/**
 * 复制文本
 * @param {string} data 要复制的字符串
 */
function copyText(data,text) {
	var copyFunc
	// #ifndef H5
	copyFunc = uniappCopy // 如果是App复制，使用uniapp api复制
	// #endif
	// #ifdef H5
	copyFunc = h5Copy // 如果是H5复制，使用浏览器 api复制
	// #endif

	copyFunc(data).then(() => {
		if(text) {
			// uni.showToast({
			// 	title: text,
			// 	icon: 'none',
			// 	duration: 1000
			// })
      this.$modal.msgSuccess("复制成功");

    }
		else {
      this.$modal.msgSuccess("复制成功");

      // uni.showToast({
			// 	title: '复制成功',
			// })
		}
	}).catch(() => {
		// uni.showToast({
		// 	title: '复制失败',
		// 	icon: 'none'
		// })
	})

}

export default copyText
