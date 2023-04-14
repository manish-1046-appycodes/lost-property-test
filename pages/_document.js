import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en-GB">
        <Head>
          {/* remove auto scroll to footer for SSR pages */}
          <script
            type="text/javascript"
            id="mcjs"
            dangerouslySetInnerHTML={{
              __html: `<script src="//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js"></script>
              `,
            }}
          />

          <script
            type="text/javascript"
            id="mcjs"
            dangerouslySetInnerHTML={{
              __html: `!function(c,h,i,m,p){m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,"script","https://chimpstatic.com/mcjs-connected/js/users/5a1c502d9787103942bfc76a5/a15b3ae73e898f7ad1c2167dc.js")`,
            }}
          />
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
