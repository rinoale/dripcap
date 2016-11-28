import { remote, shell } from 'electron';
import { webFrame } from 'electron';
import * as riot from 'riot';

export default function init(dripcap) {
  let { Theme, PubSub, Package, Session } = dripcap;

  PubSub.on('core:new-window', () => remote.getGlobal('dripcap-core').newWindow());
  PubSub.on('core:close-window', () => remote.getCurrentWindow().close());
  PubSub.on('core:reload-window', () => remote.getCurrentWindow().reload());
  PubSub.on('core:toggle-devtools', () => remote.getCurrentWindow().toggleDevTools());
  PubSub.on('core:window-zoom', () => remote.getCurrentWindow().maximize());
  PubSub.on('core:open-user-directroy', () => shell.showItemInFolder(config.profilePath));
  PubSub.on('core:open-website', () => shell.openExternal('https://dripcap.org'));
  PubSub.on('core:open-wiki', () => shell.openExternal('https://github.com/dripcap/dripcap/wiki'));
  PubSub.on('core:show-license', () => shell.openExternal('https://github.com/dripcap/dripcap/blob/master/LICENSE'));
  PubSub.on('core:quit', () => remote.app.quit());

  PubSub.on('core:zoom-in', () => webFrame.setZoomFactor(webFrame.getZoomFactor() + 0.1));
  PubSub.on('core:zoom-out', () => webFrame.setZoomFactor(webFrame.getZoomFactor() - 0.1));
  PubSub.on('core:zoom-reset', () => webFrame.setZoomFactor(1.0));

  riot.require(__dirname + '/session-list.tag');
  riot.require(__dirname + '/tab-view.tag');
  riot.require(__dirname + '/grid-container.tag');
  riot.require(__dirname + '/splitter.tag');
  riot.require(__dirname + '/modal-view.tag');
  riot.require(__dirname + '/content-root.tag');
  riot.mount(document.body, 'drip-content-root');

  Package.updatePackageList();

  Session.create('en0').then((sess) => {
    sess.on('stat', (s) => console.log(s));
    PubSub.emit('core:session-added', sess);
    sess.start();
    sess.on('log', log => {
      console.log(log)
    });
  });
  Session.create('en1').then((sess) => {
    sess.on('stat', (s) => console.log(s));
    PubSub.emit('core:session-added', sess);
    sess.start();
    sess.on('log', log => {
      console.log(log)
    });
  });

  return new Promise((res) => {
    Package.sub('core:package-loaded', res);
  });
}
