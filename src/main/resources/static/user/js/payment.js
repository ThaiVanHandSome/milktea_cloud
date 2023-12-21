const address = document.querySelector('#addressInp');
const phoneNumber = document.querySelector('#phoneNumberInp');
const listRadio = document.querySelectorAll('.form-check-input-radio');
const note = document.querySelector('#exampleFormControlTextarea1');
const price = document.querySelector('.payment-price-val');
const product = document.querySelector('.payment-product');
const fee = document.querySelector('.payment-fee');
const finalPrice = document.querySelector('.payment-final-price');
const orderDay = document.querySelector('.payment-order-day');
const shipDay = document.querySelector('.payment-ship-day');
const paymentBtn = document.querySelector('.payment-btn');
const agreeCheckbox = document.querySelector('#flexCheckDefault');
const placeResult = document.querySelector('.places-result');
let listPlaceItem = document.querySelectorAll('.places-result-item');
const listFee = document.querySelectorAll('.branch-fee-val');
const listRadioBranch = document.querySelectorAll('.radio-branch');
const listBranchAddress = document.querySelectorAll('.list-branches-item-address');

let timeoutId = null;
let shipAddress = "";

function convertToDateTime(dateString) {
	const date = new Date(dateString);

	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	const hours = String(date.getHours()).padStart(2, '0');
	const minutes = String(date.getMinutes()).padStart(2, '0');
	const seconds = String(date.getSeconds()).padStart(2, '0');

	const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

	return formattedDateTime;

}

var currentDate = new Date();
orderDay.textContent = convertToDateTime(currentDate.toISOString());
shipDay.textContent = convertToDateTime(currentDate.toISOString());

function convertToVal(str) {
	str = str.slice(0, -1);
	console.log(str);
	return parseInt(str);
}

finalPrice.textContent = convertToVal(price.textContent) + convertToVal(fee.textContent) + 'đ';

paymentBtn.addEventListener('click', function() {
	var dataJSON = document.querySelector('.payment-content').getAttribute('data-name');
	console.log(dataJSON);
	data = JSON.parse(dataJSON);
	var orderData = {};
	orderData.address = address.value;
	orderData.phoneNumber = phoneNumber.value;
	orderData.note = note.value;
	orderData.totalPrice = convertToVal(price.textContent);
	orderData.totalProduct = parseInt(product.textContent);
	orderData.finalPrice = convertToVal(finalPrice.textContent);
	orderData.orderDay = orderDay.textContent;
	orderData.shipDay = shipDay.textContent;
	orderData.fee = convertToVal(fee.textContent);
	listRadioBranch.forEach((item) => {
		if (item.checked) {
			orderData.idBranch = item.getAttribute('data-id');
		}
	})
	listRadio.forEach(function(item) {
		if (item.checked) {
			orderData.idPayMethod = item.getAttribute('data-id');
		}
	})
	const check = orderData.idPayMethod == 'VNPAY';

	if (!agreeCheckbox.checked) {
		alert('Bạn cần đồng ý với điều khoản trước khi thanh toán.');
		return;
	}

	orderData.list = data.list;
	orderData.orderState = 0;
	function customBase64Encode(str) {
		return btoa(unescape(encodeURIComponent(str)));
	}

	var encodedData = customBase64Encode(JSON.stringify(orderData));
	var myAnchor = document.createElement('a');

	if (check) {
		myAnchor.setAttribute('href', '/api/payment/create_payment?cost=' + orderData.finalPrice + '&data=' + encodedData);
	}
	else {
		myAnchor.setAttribute('href', '/payment/order?data=' + encodedData);
	}
	myAnchor.click();
})

function addPlace(value) {
	address.value = value;
	placeResult.innerHTML = '';
}


listRadioBranch.forEach((radio, index) => {
	radio.addEventListener('change', async () => {
		if (radio.checked) {
			fee.textContent = listFee[index].textContent;
			finalPrice.textContent = convertToVal(listFee[index].textContent) + convertToVal(price.textContent) + "đ";
			shipAddress = listBranchAddress[index].textContent;
		}
	});
});






