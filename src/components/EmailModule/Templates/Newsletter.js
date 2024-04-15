export function render(data) {

    let html = `
    <!DOCTYPE htmlPUBLIC>
    <html xmlns="http://www.w3.org/1999/xhtml" lang="es">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="color-scheme" content="light dark">
        <meta name="supported-color-schemes" content="light dark">
        <style type="text/css">
        @media only screen and (max-width: 600px) {
            .webkit {
                width: 100% !important;
                max-width: 600px !important;
            }
            .stacked {
                display: block;
                width: 100%;
                padding-right: 0px !important;
                padding-left: 0px !important;
            }
            .stacked img{
                width: 80%;
                padding-right: 0px !important;
                padding-left: 0px !important;
            }
            .stacked:not(:first-child){
                padding-top: 0px !important;
            }
        }
        @container (max-width: 600px) {
            .webkit {
                width: 100% !important;
                max-width: 600px !important;
            }
            .stacked {
                display: block;
                width: 100%;
                padding-right: 0px !important;
                padding-left: 0px !important;
            }
            .stacked img{
                width: 80%;
                padding-right: 0px !important;
                padding-left: 0px !important;
            }
            .stacked:not(:first-child){
                padding-top: 0px !important;
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
            <!-- Banner -->
            <table role="banner" style="border-spacing:0;font-size:18px;width: 100%; align="center" cellspacing="0">
            <tr>
                <td style="border-spacing:0;padding:0px;">
                <img src="${data.banner}" alt="Banner" width="100%"/>
                </td>
            </tr>
            </table>
            <!-- Introduction -->
            <table style="font-size:18px; background-color: #FFFFFF">
            <tr>
                <td>
                <h1 style="padding: 16px; padding-bottom: 0px; text-align: center;">${data.title}</h1>
                <p style="padding: 16px; padding-top: 0px; line-height: 1.5;">${data.content}</p>
                </td>
            </tr>
            </table>
            <!-- Explanation 1-->
            <table role="offers" style="border-spacing:0;font-size:18px;width: 100%; background-color: #FFFFFF;" cellspacing="0">
            <tr>
                <td class="stacked" align="center" style="border-spacing:0;padding-top: 32px; padding-bottom: 16px; padding-left: 8px; padding-right: 8px;" width="50%" valign="top">
                <img src="${data.picture_a}" alt="illustration" width="100%"/>
                </td>
                <td class="stacked" align="center" style="border-spacing:0;padding-top: 32px; padding-bottom: 16px;" valign="top">
                <p style="padding: 16px; padding-top: 0px; line-height: 1.5;">${data.side_text_a}</p>
                </td>
            </tr>
            </table>
            <!-- Explanation 2-->
            <table role="offers" style="border-spacing:0;font-size:18px;width: 100%; background-color: #FFFFFF;" cellspacing="0">
            <tr>
                <td class="stacked" align="center" style="border-spacing:0;padding-top: 32px; padding-bottom: 16px; padding-left: 8px; padding-right: 8px;" width="50%" valign="top">
                <img src="${data.picture_b}" alt="illustration" width="100%"/>
                </td>
                <td class="stacked" align="center" style="border-spacing:0;padding-top: 32px; padding-bottom: 16px;" valign="top">
                <p style="padding: 16px; padding-top: 0px; line-height: 1.5;">${data.side_text_b}</p>
                </td>
            </tr>
            </table>
            <!-- Social -->
            <table width="100%" style="border-spacing:0;font-size:18px;background-color: ${data.theme};" cellspacing="0">
            <tr>
                <td align="center" style="border-spacing:0;padding: 16px;">
                <p style="color: #ffffff;">Connect with us</p>
                <a href="${data.facebook_link}"><img src="http://localhost/api-nimbus-2/uploads/white-facebook.png" alt="facebook" width="30" style="margin-left: 4px; margin-right: 4px;"></a>
                <a href="${data.instagram_link}"><img src="http://localhost/api-nimbus-2/uploads/white-instagram.png" alt="instagram" width="30" style="margin-left: 4px; margin-right: 4px;"></a>
                <a href="${data.youtube_link}"><img src="http://localhost/api-nimbus-2/uploads/white-youtube.png" alt="youtube" width="30" style="margin-left: 4px; margin-right: 4px;"></a>
                </td>
            </tr>
            </table>
            <!-- Footer -->
            <table width="100%" style="border-spacing:0;font-size:18px;background-color: #efefef;" cellspacing="0">
            <tr>
                <td align="center" style="border-spacing:0;padding: 16px;">
                <img src="${data.footer}" alt="Logo" width="140px">
                <p>${data.slogan}</p>
                <p>${data.address}</p>
                <p><a href="mailto:${data.email}">${data.email}</a></p>
                <p><a href="tel:${data.phone}">Call: ${data.phone}</a></p>
                </td>
            </tr>
            </table>
            <!-- Tab -->
            <table width="100%" cellspacing="0" style="border-spacing:0;font-size:18px;">
            <tr>
                <td style="border-spacing:0;height: 24px; background-color: ${data.theme};">
                </td>
            </tr>
            </table>
        </div>
        </center>
    </body>
    </html>
    `;

    return btoa(html);
    // return html;

}