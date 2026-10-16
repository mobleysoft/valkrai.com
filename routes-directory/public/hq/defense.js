    const fusionSessionId = new URLSearchParams(window.location.search).get('session_id');
    if (fusionSessionId) {
      localStorage.setItem('vendyai_session_valkrai_com', fusionSessionId);
      document.getElementById('fusion-pro-status').textContent = 'Verifying purchase...';
    }
    document.getElementById('fusion-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const tracks = document.getElementById('fusion-tracks').value.trim();
      const threshold = document.getElementById('fusion-threshold').value || '5';
      const result = document.getElementById('fusion-result');
      if (!tracks) return;
      result.textContent = 'Fusing...';
      const fusionSid = localStorage.getItem('vendyai_session_valkrai_com') || '';
      try {
        const res = await fetch('/api/multi-domain-fusion?tracks=' + encodeURIComponent(tracks) + '&threshold=' + encodeURIComponent(threshold) + (fusionSid ? '&session_id=' + encodeURIComponent(fusionSid) : ''));
        const data = await res.json();
        result.textContent = JSON.stringify(data, null, 2);
        document.getElementById('fusion-pro-status').textContent = data.pro ? 'Pro active - up to 8 tracks.' : '';
      } catch (err) { result.textContent = err.message; }
    });
    document.getElementById('upgrade-btn')?.addEventListener('click', async () => {
      const btn = document.getElementById('upgrade-btn');
      btn.disabled = true;
      btn.textContent = 'Loading...';
      try {
        const res = await fetch('/api/upgrade-checkout', { method: 'POST' });
        const data = await res.json();
        if (data.url) { window.location.href = data.url; }
        else { btn.textContent = 'Unavailable - try again later'; btn.disabled = false; }
      } catch (err) { btn.textContent = 'Error: ' + err.message; btn.disabled = false; }
    });
