import { config } from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initFirebase } from './util/init-firebase';

config();

const domain = 'http://0.0.0.0';
const port = '3000';

async function bootstrap() {
  initFirebase();

  const app = await NestFactory.create(AppModule);
  await app.listen(port);

  console.log(LOGO_BANNER);
  console.log(`Listening on: ${domain}:${port}`);
}
bootstrap();

const LOGO_BANNER = `
=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+
MMMMMMMMMMMMMMMMWXOxOKWMMXM00oo00MXMMWKOk0XWMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMWXOxOKWMMXo..  ..oXMMWKOk0XWMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMKl.   'kWK;        ;KWx.   .oXMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMWx.    lX0,          ,0K:    .xWMMMMMMMMMMMMMM
MMMMMMMWXkoodk00OxolxXO'            'OKdldkOKKOxddkXMMMMMMMM
MMMMMMWk'     ..,:xXWk.              .kWNxc;'.     'kWMMMMMM
MMMMMMX:         .dXx.                .xXd.         :XMMMMMM
MMMMMMNo        ;OKo.                  .oKO;        oWMMMMMM
MMWXOONK,     'dKO;                      ;OKd'     ,0NOOXWMM
MXl. .dNd. .;xKOc.                        .cOKx:. .dNd. .oXM
Wd.   '0Xxx00d,.                            .,d00xxX0'   .dW
Wk. .;dKXOo;.                                  .;oOXXx:. .kW
MW0O0Od:.                                          .:dO0O0WM
WKkl,.                 l0d.      .oOl                 .,lkXW
l.                    .dWW0;    ,OWWd.                    .l
                      .dWK0Kc..cK0KWd.                      
.                     .dWd,dXXXXd,dNd.                     .
0o;.                  .dNo  :oo;  oNd.                  .,o0
MMN0xc'                '^'        '^'                'cx0NMM
MKl:oO0Oo;.                                      .;oO0ko:lKM
Wo    ;0WX0kc'                                'lk0XW0;   .dW
Wk.   :XO,,lOKx:.                          .:k0kl';OX:   'OM
MW0o:c0X:   .,dKO:.                      .:OKd,    cXO::o0WM
MMMMWWWx.      'xKx'                    'xXx'      .kWWWMMMM
MMMMMMK;        .cK0:                  :0Kc.        :XMMMMMM
MMMMMMXc         .oXXc                cXNo.         lNMMMMMM
MMMMMMMXd;'',:ldkO00XXl             .lXX00Okdl:,'';dXMMMMMMM
MMMMMMMMMWNNWWWOc,..,kXo.          .oXk,..,cOWWWNNWMMMMMMMMM
MMMMMMMMMMMMMMWk.    .kNd.        .dXk.    .kWMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMW0o:;:o0WWx.      .xWW0o:;:o0WMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMWWWMMMMWk;.  .;kWMMMMWWWMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMWWWMMMMWMk0oo0kMWMMMMWWWMMMMMMMMMMMMMMMMMM
=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+

=================== Generic NesstJS API ====================
`;
