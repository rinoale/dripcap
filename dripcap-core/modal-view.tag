<drip-modal-view>
  <div class="mask" onclick={ close }></div>
  <div class="dialog">
    <drip-tab-view if={ items } items={ items }></drip-tab-view>
  </div>
  <style type="text/less">
    :scope {
      display: grid;
      overflow: hidden;
      grid-template-areas: ". . ."
                           ". center ."
                           ". . .";

      > div.mask {
        background-color: var(--color-selection-background);
        opacity: 0.6;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        z-index: 1;
        -webkit-app-region: no-drag;
      }

      > div.dialog {
        display: grid;
        grid-area: center;
        background-color: var(--color-default-background);
        border-radius: 5px;
        border: 1px solid var(--color-variables);
        z-index: 2;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        > drip-grid-container > div.center {
           padding: 20px;
        }
      }
    }
  </style>

  <script>
    const $ = require('jquery');
    const {Layout} = require('dripcap');
    this.items = null;

    set(items, opts = {}) {
      this.items = items;
      let width = opts.width || '480px';
      let height = opts.height || '320px';
      $(this.root)
        .css('grid-template-columns', `1fr ${width} 1fr`)
        .css('grid-template-rows', `1fr ${height} 1fr`);
      this.update();
    }

    close() {
      this.set();
    }

    this.on('update', () => {
      $(this.root).toggle(!!this.items);
    });
    this.on('mount', () => {
      $(this.root).hide();
      if (opts.dataContainerId) {
        Layout.registerContainer(opts.dataContainerId, this);
      }
    });
    this.on('unmount', () => {
      if (opts.dataContainerId) {
        Layout.unregisterContainer(opts.dataContainerId);
      }
    });
  </script>
</drip-modal-view>
