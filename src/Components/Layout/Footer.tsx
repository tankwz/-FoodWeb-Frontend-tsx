import React from 'react';

function Footer() {
  return (
    <div>
      <footer
        className="border-top footer text-muted footer fixed-bottom "
        style={{ backgroundColor: 'rgb(17, 133, 220)' }}
      >
        <div className="container">
          <i className="bi bi-cup-hot"></i> -Trinh Nhat Tan 2023 All Rights
          Reserved- <a>Privacy</a>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
