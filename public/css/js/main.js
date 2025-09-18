// file: /public/js/main.js

document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ main.js loaded");

  // Highlight menu đang active
  const currentPath = window.location.pathname;
  document.querySelectorAll("nav a").forEach(link => {
    if (link.getAttribute("href") === currentPath) {
      link.style.fontWeight = "bold";
      link.style.color = "blue";
    }
  });

  // Confirm trước khi xóa
  document.querySelectorAll("a[href*='/delete']").forEach(delLink => {
    delLink.addEventListener("click", (e) => {
      if (!confirm("Bạn có chắc muốn xóa mục này không?")) {
        e.preventDefault();
      }
    });
  });
});
