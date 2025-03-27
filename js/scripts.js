(() => {
  const spBreak = 767.98;

  const isMobile = () => {
    return window.matchMedia(`(max-width: ${spBreak}px)`).matches;
  };

  const detectBrowsers = () => {
    const html = $("html");
    const ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf("mac") >= 0) {
      html.addClass("is-mac");
    }
    if (ua.indexOf("safari") !== -1) {
      if (ua.indexOf("chrome") > -1) {
        html.addClass("is-chrome");
      } else {
        html.addClass("is-safari");
      }
    }
    if (ua.indexOf("msie ") > -1 || ua.indexOf("trident/") > -1) {
      html.addClass("is-ie");
    }
    if (ua.indexOf("firefox") > -1) {
      html.addClass("is-firefox");
    }
    if (ua.indexOf("android") > -1) {
      html.addClass("is-android");
    }
    if (ua.match(/(iphone|ipod|ipad)/)) {
      html.addClass("is-ios");
    }
    if (ua.indexOf("edg/") > -1) {
      html.removeClass("is-chrome");
      html.addClass("is-chromium");
    }
  };

  const tabletViewport = () => {
    const viewport = document.getElementById("viewport");
    let ua = "";
    const setViewport = () => {
      const portrait = window.matchMedia("(orientation: portrait)").matches;
      if (window.screen.width < 375 && portrait) {
        viewport.setAttribute("content", "width=375, user-scalable=0");
      } else if (
        (window.screen.width >= 768 && window.screen.width <= 1199) ||
        (window.screen.width < 768 && window.screen.height >= 768 && !portrait)
      ) {
        viewport.setAttribute("content", "width=1300, user-scalable=0");
        ua = navigator.userAgent.toLowerCase();
        if (
          (/macintosh/i.test(ua) &&
            navigator.maxTouchPoints &&
            navigator.maxTouchPoints > 1) ||
          (ua.match(/(iphone|ipod|ipad)/) && !isMobile()) ||
          (ua.indexOf("android") > -1 && !isMobile())
        ) {
          $("html").addClass("is-tablet");
        }
      } else {
        viewport.setAttribute(
          "content",
          "width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=0",
        );
        $("html").removeClass("is-tablet");
      }
    };
    setViewport();
    $(window).on("load resize", setViewport);
  };

  const smoothScroll = () => {
    const anchors = $('a[href*="#"]:not([href="#"])');
    const headerHeight = 0;
    const speed = 500;
    let timeout = 0;
    let position = 0;
    const triggerScroll = (context) => {
      const href =
        typeof context === "string"
          ? context
          : "#" + $(context).attr("href").split("#")[1];
      if (!$(context).hasClass("no-scroll") && $(href).length) {
        position = $(href).offset().top - headerHeight;
        $("body, html").animate({ scrollTop: position }, speed, "swing");
        return false;
      }
      return true;
    };
    setTimeout(() => {
      window.scroll(0, 0);
      $("html").removeClass("is-loading").addClass("is-visible");
    }, 1);
    if (window.location.hash) {
      window.scroll(0, 0);
      if (
        navigator.userAgent.indexOf("MSIE ") > -1 ||
        navigator.userAgent.indexOf("Trident/") > -1
      ) {
        timeout = 0;
      } else {
        timeout = 500;
      }
      setTimeout(() => {
        triggerScroll(window.location.hash);
      }, timeout);
    }
    anchors.on("click", (e) => triggerScroll(e.target.closest("a")));
  };

  $(() => {
    detectBrowsers();
    tabletViewport();
    smoothScroll();
  });
})();

// document.addEventListener("DOMContentLoaded", function () {
//   const inputIds = [
//     "sofile",
//     "soMBL",
//     "soCoint",
//     "soRoute",
//     "soETD",
//     "soETA",
//     "tenTau",
//     "soCont",
//     "hangTau",
//     "ketQua",
//   ];

//   const specialPrefixes = {
//     soMBL: "MBL ",
//     soETD: "ETD ",
//     soETA: "ETA ",
//   };

//   const sectionShow = document.querySelector(".list-show");
//   const sofileInput = document.getElementById("sofile");
//   const ketQuaInput = document.getElementById("ketQua");

//   // Chỉ cho phép nhập tối đa 6 số ở input đầu tiên
//   sofileInput.addEventListener("input", function () {
//     this.value = this.value.replace(/\D/g, "").slice(0, 6);
//   });

//   // Kiểm tra khi người dùng nhấn Tab hoặc rời khỏi input đầu tiên
//   sofileInput.addEventListener("keydown", function (event) {
//     if (event.key === "Tab" || event.key === "Enter") {
//       if (this.value.length !== 6) {
//         event.preventDefault(); // Ngăn chặn tab đi tiếp
//         alert("Hãy nhập 6 chữ số");
//         this.focus();
//       }
//     }
//   });

//   // Xử lý khi nhấn Enter ở input cuối cùng
//   ketQuaInput.addEventListener("keydown", function (event) {
//     if (event.key === "Enter") {
//       event.preventDefault();
//       let resultText = "";

//       // Kiểm tra nếu input cuối cùng rỗng thì báo lỗi
//       if (ketQuaInput.value.trim() === "") {
//         alert("Hãy nhập kết quả cuối cùng");
//         ketQuaInput.focus();
//         return;
//       }

//       inputIds.forEach((id, index) => {
//         let inputValue = document.getElementById(id).value.trim();

//         if (inputValue === "z") return; // Bỏ qua nếu nhập "z"
//         if (inputValue === "") {
//           inputValue = "   "; // Nếu trống thì in "   "
//           if (specialPrefixes[id]) specialPrefixes[id] = ""; // Xóa tiền tố nếu trống
//         }

//         if (id === "sofile") {
//           resultText += inputValue + ":";
//         } else if (id === "ketQua") {
//           resultText += " => " + inputValue;
//         } else if (id === "hangTau") {
//           resultText += " " + inputValue;
//         } else {
//           let prefix = specialPrefixes[id] || "";
//           resultText += " " + prefix + inputValue + " /";
//         }
//       });

//       resultText = resultText.replace(/\s\/$/, ""); // Xóa dấu "/" cuối chuỗi

//       const newListItem = document.createElement("li");
//       newListItem.classList.add("list-item");

//       const wrapperDiv = document.createElement("div");
//       wrapperDiv.classList.add("item-wrapper");
//       wrapperDiv.textContent = resultText;

//       // const deleteButton = document.createElement("button");

//       const deleteButton = document.createElement("button");
//       const span1 = document.createElement("span");
//       span1.textContent = "Delete";
//       span1.className = "span-delete";
//       const span2 = document.createElement("span");
//       span2.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-miterlimit="2" stroke-linejoin="round" fill-rule="evenodd" clip-rule="evenodd"><path fill-rule="nonzero" d="m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 1.5c-4.69 0-8.497 3.807-8.497 8.497s3.807 8.498 8.497 8.498 8.498-3.808 8.498-8.498-3.808-8.497-8.498-8.497zm0 7.425 2.717-2.718c.146-.146.339-.219.531-.219.404 0 .75.325.75.75 0 .193-.073.384-.219.531l-2.717 2.717 2.727 2.728c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.384-.073-.53-.219l-2.729-2.728-2.728 2.728c-.146.146-.338.219-.53.219-.401 0-.751-.323-.751-.75 0-.192.073-.384.22-.531l2.728-2.728-2.722-2.722c-.146-.147-.219-.338-.219-.531 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"></path></svg>`;
//       span2.className = "span-decor";
//       deleteButton.appendChild(span1);
//       deleteButton.appendChild(span2);

//       deleteButton.addEventListener("click", function () {
//         newListItem.remove();
//       });

//       wrapperDiv.appendChild(deleteButton);
//       newListItem.appendChild(wrapperDiv);
//       sectionShow.appendChild(newListItem);

//       // Reset input về trống để nhập bản ghi mới
//       inputIds.forEach((id) => {
//         document.getElementById(id).value = "";
//       });

//       sofileInput.focus(); // Quay lại input đầu tiên
//     }
//   });
// });
document.addEventListener("DOMContentLoaded", function () {
  function updateTime() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    // Định dạng mới
    const formattedTime = `Ngày ${day} tháng ${month} năm ${year} | Giờ: ${hours}:${minutes}:${seconds}`;
    document.querySelector(".block-time").textContent = formattedTime;
  }

  // Cập nhật ngay khi tải trang
  updateTime();

  // Cập nhật mỗi giây
  setInterval(updateTime, 1000);
});
document.addEventListener("DOMContentLoaded", function () {
  const inputIds = [
    "sofile",
    "soMBL",
    "soCoint",
    "soRoute",
    "soETD",
    "soETA",
    "tenTau",
    "soCont",
    "hangTau",
    "ketQua",
  ];

  const specialPrefixes = {
    soMBL: "MBL ",
    soETD: "ETD ",
    soETA: "ETA ",
  };

  const sectionShow = document.querySelector(".list-show");
  const sofileInput = document.getElementById("sofile");
  const ketQuaInput = document.getElementById("ketQua");

  // Chỉ cho phép nhập tối đa 6 số ở input đầu tiên
  sofileInput.addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "").slice(0, 6);
  });

  // Kiểm tra khi người dùng nhấn Tab hoặc rời khỏi input đầu tiên
  sofileInput.addEventListener("keydown", function (event) {
    if (event.key === "Tab" || event.key === "Enter") {
      if (this.value.length !== 6) {
        event.preventDefault(); // Ngăn chặn tab đi tiếp
        alert("Hãy nhập 6 chữ số");
        this.focus();
      }
    }
  });

  // Xử lý khi nhấn Enter ở input cuối cùng
  ketQuaInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      let resultText = "";

      // Kiểm tra nếu input cuối cùng rỗng thì báo lỗi
      if (ketQuaInput.value.trim() === "") {
        alert("Hãy nhập kết quả cuối cùng");
        ketQuaInput.focus();
        return;
      }

      inputIds.forEach((id, index) => {
        let inputValue = document.getElementById(id).value.trim();

        if (inputValue === "z") return; // Bỏ qua nếu nhập "z"
        if (inputValue === "") {
          inputValue = "   "; // Nếu trống thì in "   "
          if (specialPrefixes[id]) specialPrefixes[id] = ""; // Xóa tiền tố nếu trống
        }

        if (id === "sofile") {
          resultText += inputValue + ":";
        } else if (id === "ketQua") {
          resultText += " => " + inputValue;
        } else if (id === "hangTau") {
          resultText += " " + inputValue;
        } else {
          let prefix = specialPrefixes[id] || "";
          resultText += " " + prefix + inputValue + " /";
        }
      });

      resultText = resultText.replace(/\s\/$/, ""); // Xóa dấu "/" cuối chuỗi

      const newListItem = document.createElement("li");
      newListItem.classList.add("list-item");

      const wrapperDiv = document.createElement("div");
      wrapperDiv.classList.add("item-wrapper");
      wrapperDiv.textContent = resultText;

      const deleteButton = document.createElement("button");

      // Kiểm tra nếu thẻ li có thứ tự chẵn hay lẻ
      if (sectionShow.children.length % 2 === 1) {
        // Thứ tự chẵn
        const svgIcon = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "svg",
        );
        svgIcon.setAttribute("viewBox", "0 0 448 512");
        svgIcon.classList.add("svgIcon");

        const path = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path",
        );
        path.setAttribute(
          "d",
          "M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z",
        );

        svgIcon.appendChild(path);
        deleteButton.appendChild(svgIcon); // Chỉ thêm SVG vào button
      } else {
        // Thứ tự lẻ, giữ nguyên với 2 span
        const span1 = document.createElement("span");
        span1.textContent = "Delete";
        span1.className = "span-delete";
        const span2 = document.createElement("span");
        span2.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-miterlimit="2" stroke-linejoin="round" fill-rule="evenodd" clip-rule="evenodd"><path fill-rule="nonzero" d="m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 1.5c-4.69 0-8.497 3.807-8.497 8.497s3.807 8.498 8.497 8.498 8.498-3.808 8.498-8.498-3.808-8.497-8.498-8.497zm0 7.425 2.717-2.718c.146-.146.339-.219.531-.219.404 0 .75.325.75.75 0 .193-.073.384-.219.531l-2.717 2.717 2.727 2.728c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.384-.073-.53-.219l-2.729-2.728-2.728 2.728c-.146.146-.338.219-.53.219-.401 0-.751-.323-.751-.75 0-.192.073-.384.22-.531l2.728-2.728-2.722-2.722c-.146-.147-.219-.338-.219-.531 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"></path></svg>`;
        span2.className = "span-decor";
        deleteButton.appendChild(span1);
        deleteButton.appendChild(span2);
      }

      deleteButton.addEventListener("click", function () {
        newListItem.remove();
      });

      wrapperDiv.appendChild(deleteButton);
      newListItem.appendChild(wrapperDiv);
      sectionShow.appendChild(newListItem);

      // Reset input về trống để nhập bản ghi mới
      inputIds.forEach((id) => {
        document.getElementById(id).value = "";
      });

      sofileInput.focus(); // Quay lại input đầu tiên
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const wrapper = document.querySelector(".section-show .wrapper");

  // Tạo nút Copy All
  const copyButton = document.createElement("button");
  copyButton.textContent = "Copy All";
  copyButton.id = "copyButton";
  copyButton.classList.add("btn-copy");

  wrapper.insertBefore(copyButton, wrapper.firstChild); // Thêm vào đầu wrapper

  // Modal để xác nhận sao chép
  const confirmBox = document.createElement("div");
  confirmBox.classList.add("confirm-box");
  confirmBox.innerHTML = `
    <div class="confirm-content">
      <div class="love">
        <input id="switch" type="checkbox">
        <label class="love-heart" for="switch">
          <i class="left"></i>
          <i class="right"></i>
          <i class="bottom"></i>
          <div class="round"></div>
        </label>
      </div>
      <p>Em có đang nhớ Bình Phạm không?</p>
      <button class="card save-btn">
        <p class=heading>Tất nhiên là cóoooooo!!</p>
      </button>
      <button class="cancel-btn">Ai thèm nhớ là gì</button>
    </div>
  `;
  document.body.appendChild(confirmBox);
  confirmBox.style.display = "none"; // Ẩn modal ban đầu

  // Modal thông báo cần lưu
  const warningBox = document.createElement("div");
  warningBox.classList.add("warning-box");
  warningBox.innerHTML = `<p>Em trả lời sai rồi</p>`;
  document.body.appendChild(warningBox);
  warningBox.style.display = "none"; // Ẩn modal cảnh báo

  // Lắng nghe sự kiện click trên nút Copy All
  copyButton.addEventListener("click", function () {
    const records = document.querySelectorAll(".item-wrapper");
    let textToCopy = "";

    records.forEach((record) => {
      // Lấy chỉ nội dung textContent của record mà không có chữ "Delete" trong button
      const textContent = record.textContent.replace("Delete", "").trim();
      textToCopy += textContent + "\n";
    });

    if (textToCopy.trim() === "") {
      // Nếu không có bản ghi nào
      alert("Không có bản ghi nào để sao chép!");
      return;
    }

    // Hiển thị modal xác nhận sao chép
    confirmBox.style.display = "block";

    // Lắng nghe sự kiện khi nhấn Lưu văn bản
    const saveButton = confirmBox.querySelector(".save-btn");
    saveButton.addEventListener("click", function () {
      // Đổi màu nền của box confirm khi nhấn "Lưu văn bản"
      confirmBox.style.backgroundColor = "#d4edda"; // Màu nền mới (màu xanh nhẹ)

      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          confirmBox.style.display = "none"; // Ẩn modal xác nhận
          alert("Đã sao chép toàn bộ bản ghi!"); // Hiển thị thông báo alert chỉ 1 lần
        })
        .catch(() => {
          alert("Lỗi khi sao chép!");
        });
    });

    // Lắng nghe sự kiện khi nhấn Cancel
    const cancelButton = confirmBox.querySelector(".cancel-btn");
    cancelButton.addEventListener("click", function () {
      confirmBox.style.display = "none"; // Ẩn modal xác nhận
      warningBox.style.display = "block"; // Hiển thị modal cảnh báo

      // Tự động ẩn modal cảnh báo sau 3 giây
      setTimeout(() => {
        warningBox.style.display = "none"; // Ẩn modal cảnh báo sau khi hết thời gian
        confirmBox.style.display = "block"; // Hiển thị lại modal xác nhận
      }, 1000); // Đợi 3 giây, sau đó hiển thị lại confirmBox
    });
  });
});
