export function render(data) {

    let html = `
    <!DOCTYPE htmlPUBLIC>
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="color-scheme" content="light dark">
        <meta name="supported-color-schemes" content="light dark">
        <style>
        h3{margin: 1.5em 0;}
        @media only screen and (max-width: 600px){
            .webkit {
                width: 100% !important;
                max-width: 600px !important;
            }
            table {
                font-size: 12px !important;
            }
        }
        @container (max-width: 600px){
            .webkit {
                width: 100% !important;
                max-width: 600px !important;
            }
            table {
                font-size: 12px !important;
            }
        }
        </style>
    </head>
    <body style="margin:0px;background-color:#f7f9fc;font-family:Arial, Helvetica, sans-serif;">
        <center class="wrapper">
        <div class="webkit" style="width:600px;padding-bottom:60px;">
            <!-- Header -->
            <table role="header" style="border-spacing:0;font-size:18px;width: 100%;" align="center" cellspacing="0">
            <tr>
                <td style="border-spacing:0;background-color: ${data.theme}; text-align: center; padding: 16px;">
                <img src="${data.logo}" alt="Logo" width="180px">
                </td>
            </tr>
            </table>
            <!-- Main text -->
            <table role="content" style="border-spacing:0;font-size:18px;width: 100%;">
            <tr>
                <td style="border-spacing:0; background-color:#fff; padding: 1rem;">
                    <h3>${data.title}</h3>
                    <p style="line-height: 1.5;">
                        ${data.content}
                    </p>
                </td>
            </tr>
            </table>
            <!-- Banner -->
            <table role="banner" style="border-spacing:0;width: 100%;background-color:white;">
            <tr>
                <td style="border-spacing:0;padding:0px;background-color: #fff;">
                <img src="${data.banner}" alt="Banner" width="100%"/>
                <br/><br/><br/>
                <center><a href="${data.buttonLink}" target="_blank" style="padding:.5rem 1rem;background-color:${data.theme};border-radius:.5rem;border:2px solid white;color:white;">${data.buttonText}</a></center>
                <br/><br/>
                </td>
            </tr>
            </table>
            <!-- Footer -->
            <table width="100%" style="border-spacing:0;font-size:18px;background-color: #fff;" cellspacing="0">
            <tr>
                <td align="center" style="border-spacing:0;padding: 16px;">
                <img src="${data.footer}" alt="Logo" width="140px">
                <p>${data.slogan}</p>
                <p>${data.address}</p>
                <p><a href="mailto:${data.email}">${data.email}</a></p>
                <p><a href="tel:${data.phone}">Llame: ${data.phone}</a></p>
                </td>
            </tr>
            </table>
            <!-- Social -->
            <table width="100%" style="border-spacing:0;font-size:18px;background-color: ${data.theme};" cellspacing="0">
            <tr>
                <td align="center" style="border-spacing:0;padding: 16px;">
                <p style="color: #ffffff;">Siganos en redes</p>
                <a href="#"><img src="http://api.nimbus.pluralis.com.mx/assets/white-facebook.png" alt="facebook" width="30" style="margin-left: 4px; margin-right: 4px;"></a>
                <a href="#"><img src="http://api.nimbus.pluralis.com.mx/assets/white-instagram.png" alt="instagram" width="30" style="margin-left: 4px; margin-right: 4px;"></a>
                <a href="#"><img src="http://api.nimbus.pluralis.com.mx/assets/white-youtube.png" alt="youtube" width="30" style="margin-left: 4px; margin-right: 4px;"></a>
                </td>
            </tr>
            </table>
        </div>
        </center>
    </body>
    </html>
    `;
    return btoa(html);
}
