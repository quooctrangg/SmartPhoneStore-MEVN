<template>
    <footer class="mt-5">
        <div class="grid grid-cols-4 gap-10 bg-green-200 p-5 justify-between">
            <div class="border-r border-orange-600 ml-10">
                <div class="flex gap-2 mb-2">
                    <i class="fa fa-truck"></i>
                    <h4 class="font-semibold">Miễn phí vận chuyển</h4>
                </div>
                <div class="">Khi Khách Hàng Chuyển Tiền Đặt Cọc</div>
            </div>
            <div class="border-r border-orange-600">
                <div class="flex gap-2 mb-2">
                    <i class="fa fa-cog"></i>
                    <h4 class="font-semibold">Hoàn 100% tiền mua hàng</h4>
                </div>
                <div class="">Trong vòng 30 ngày nếu bị lỗi từ Nhà Sản Xuất</div>
            </div>
            <div class="border-r border-orange-600">
                <div class="flex gap-2 mb-2">
                    <i class="fa fa-phone"></i>
                    <h4 class="font-semibold">Đặt hàng trực tuyến: </h4>
                </div>
                <div class="text-xl">0933445566</div>
            </div>
            <div class="flex justify-items-center items-center gap-2 justify-around">
                <div class="">
                    <p class="font-extrabold text-2xl">HOTLINE</p>
                    <span class="">Hỗ trợ trực tuyến:</span>
                </div>
                <div class="">
                    <h3 class="text-2xl">0933445566</h3>
                </div>
            </div>
        </div>
        <div class="flex justify-around p-2 mt-2">
            <div class="flex justify-items-center text-center items-center">
                <router-link :to="{ name: 'home-page' }"><img src="/logo.png" alt="" /></router-link>
            </div>
            <div class="">
                <ul class="">
                    <li>
                        <i class="fa fa-map-marker">&nbsp;</i>
                        - Địa chỉ: Đường 3/2, P. Xuân Khánh, Q. Ninh Kiều, Tp. Cần Thơ
                    </li>
                    <li>
                        <i class="fa fa-phone">&nbsp;</i>- Điện thoại: 0933445566
                    </li>
                    <li>
                        <i class="fa fa-envelope">&nbsp;</i>- Địa chỉ email:
                        <a href="/">smartphonestore@gmail.com</a>
                    </li>
                </ul>
            </div>
            <div class="">
                <div class="">
                    <p>
                        &copy; Bản quyền thuộc về
                        <router-link :to="{ name: 'home-page' }" class="text-red-600">SmartPhoneStore.</router-link>
                    </p>
                </div>
                <ul class="flex justify-around text-xl">
                    <li class="facebook text-cyan-700">
                        <a target="_blank" href="https://www.facebook.com/" class="fa-brands fa-facebook"></a>
                    </li>
                    <li class="youtube text-red-600">
                        <a class="fa-brands fa-youtube" target="_blank" href="https://www.youtube.com/"></a>
                    </li>
                    <li class="twitter text-cyan-500">
                        <a class="fa-brands fa-twitter" target="_blank" href="https://twitter.com/?lang=vi"></a>
                    </li>
                    <li class="google-plus text-red-600">
                        <a class="fa-brands fa-square-google-plus" target="_blank" href="https://www.google.com/"></a>
                    </li>
                </ul>
            </div>
        </div>
    </footer>
</template>

