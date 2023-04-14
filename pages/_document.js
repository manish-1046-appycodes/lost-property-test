import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  componentDidMount() {
    // Run your scripts here after the page loads
    // Example: Load Mailchimp popup after page loads
    setTimeout(() => {
      console.log("automatic mailchimp popup");
      document.querySelector("#show-mailchimp-popup").click();
    }, 1000);
  }

  render() {
    return (
      <Html lang="en-GB">
        <Head>
          <script
            type="text/javascript"
            id="mcjs"
            dangerouslySetInnerHTML={{
              __html: `<script src="//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js"></script>
              `,
            }}
          />

          {/* live url */}
          {/* <script
            type="text/javascript"
            id="mcjs"
            dangerouslySetInnerHTML={{
              __html: `!function(c,h,i,m,p){m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,"script","https://chimpstatic.com/mcjs-connected/js/users/5a1c502d9787103942bfc76a5/a15b3ae73e898f7ad1c2167dc.js")`,
            }}
          /> */}

          {/* live url */}
          {/* <script
            type="text/javascript"
            id="mcjs"
            dangerouslySetInnerHTML={{
              __html: `setTimeout(() => {
                !(function (c, h, i, m, p) {
                  (m = c.createElement(h)),
                    (p = c.getElementsByTagName(h)[0]),
                    (m.async = 1),
                    (m.src = i),
                    p.parentNode.insertBefore(m, p);
                })(
                  document,
                  "script",
                  "https://chimpstatic.com/mcjs-connected/js/users/5a1c502d9787103942bfc76a5/7d3683af1b429d8f42b9fda83.js"
                );
              }, 1000);`,
            }}
          /> */}

          {/* localhost */}
          {/* <script
            type="text/javascript"
            id="mcjs"
            dangerouslySetInnerHTML={{
              __html: `!function(c,h,i,m,p){m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,"script","https://chimpstatic.com/mcjs-connected/js/users/5a1c502d9787103942bfc76a5/7d3683af1b429d8f42b9fda83.js")`,
            }}
          /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
