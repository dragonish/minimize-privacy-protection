chrome.windows.onBoundsChanged.addListener(async win => {
  if (win.id && win.id > 0) {
    const curWin = await chrome.windows.get(win.id, { populate: true });

    if (curWin.tabs) {
      for (const tab of curWin.tabs) {
        if (tab.active && tab.id) {
          if (win.state === 'minimized') {
            const title = tab.title || '';
            chrome.scripting.executeScript({
              target: { tabId: tab.id },
              func: t => {
                document.title = '-';
                (window as unknown as { MinimizePrivacyProtection: string }).MinimizePrivacyProtection = t;
              },
              args: [title],
            });
          } else if (tab.title === '-') {
            chrome.scripting.executeScript({
              target: { tabId: tab.id },
              func: () => {
                const t = (window as unknown as { MinimizePrivacyProtection: string }).MinimizePrivacyProtection;
                document.title = t || '';
              },
            });
          }
          break;
        }
      }
    }
  }
});
