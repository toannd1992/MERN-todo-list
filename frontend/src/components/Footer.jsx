import React from "react";

const Footer = ({ completedCount = 0, activeCount = 0 }) => {
  // không hiển thị
  if (completedCount + activeCount === 0) return null;

  let message = "";

  if (completedCount > 0) {
    if (activeCount > 0) {
      message = `👏 Tuyệt vời, bạn đã hoàn thành ${completedCount} việc, còn ${activeCount} việc nữa thôi. Cố lên!`;
    } else {
      message = `👏👏👏 Chúc mừng bạn đã hoàn thành tất cả công việc.`;
    }
  } else {
    // completedCount === 0 && activeCount > 0
    message = `Hãy bắt đầu làm ${activeCount} nhiệm vụ nào!`;
  }

  return (
    <div className="text-center">
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
};

export default Footer;
