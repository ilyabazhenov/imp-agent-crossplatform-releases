<p align="center">
  <img src="docs/icon.png" width="96" height="96" alt="ImpAgent icon" />
</p>

<h1 align="center">ImpAgent</h1>

<p align="center">
  <b>Gets to the bottom of a task instead of retelling it.</b><br />
  Chat with a model, files, shell and git — with Jira, Confluence, Bitbucket, Jenkins,
  TestOps and Kubernetes right alongside, in one window.
</p>

<p align="center">
  <a href="../../releases/latest"><img alt="Latest version" src="https://img.shields.io/github/v/release/ilyabazhenov/imp-agent-crossplatform-releases?label=version&color=156cdd" /></a>
  <img alt="macOS and Windows" src="https://img.shields.io/badge/platform-macOS%20%C2%B7%20Windows-555" />
  <img alt="Interface in Russian" src="https://img.shields.io/badge/interface-Russian-555" />
</p>

<p align="center">
  <a href="../../releases/latest"><b>Download</b></a> ·
  <a href="https://ilyabazhenov.github.io/imp-agent-crossplatform-releases/en/"><b>Website</b></a> ·
  <a href="README.ru.md">Русская версия</a>
</p>

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="docs/shots/chat-dark.webp" />
    <img src="docs/shots/chat-light.webp" width="900" alt="ImpAgent: the agent finds why a nightly test run went red" />
  </picture>
</p>

The app is **licensed per computer**: after installation the window shows a machine code —
send it over, and you’ll get an activation string back. The interface and the agent’s replies
are in Russian.

## Not just a chat

<table>
  <tr>
    <td width="50%"><picture><source media="(prefers-color-scheme: dark)" srcset="docs/shots/jira-dark.webp" /><img src="docs/shots/jira-light.webp" alt="Jira section" /></picture><br /><sub><b>Jira</b> — an issue with its description and comments</sub></td>
    <td width="50%"><picture><source media="(prefers-color-scheme: dark)" srcset="docs/shots/bitbucket-dark.webp" /><img src="docs/shots/bitbucket-light.webp" alt="Bitbucket section" /></picture><br /><sub><b>Bitbucket</b> — a pull request with its diff and comments</sub></td>
  </tr>
  <tr>
    <td width="50%"><picture><source media="(prefers-color-scheme: dark)" srcset="docs/shots/testops-dark.webp" /><img src="docs/shots/testops-light.webp" alt="TestOps section" /></picture><br /><sub><b>TestOps</b> — a failed test run</sub></td>
    <td width="50%"><picture><source media="(prefers-color-scheme: dark)" srcset="docs/shots/kube-dark.webp" /><img src="docs/shots/kube-light.webp" alt="Cluster section" /></picture><br /><sub><b>Kubernetes</b> — a pod in CrashLoopBackOff, its events and log</sub></td>
  </tr>
</table>

## macOS

Pick the file for your computer:

- **Apple Silicon** (M1 and newer) — `ImpAgent-<version>-arm64-mac.zip`
- **Intel** — `ImpAgent-<version>-mac.zip`

Double-click to unpack it and drag ImpAgent into Applications.

The app is signed with a self-made certificate that Apple doesn’t know about, so on first
launch macOS will say the app is damaged. It isn’t: the system simply won’t vouch for a
publisher it doesn’t know. Run this once in Terminal:

```bash
xattr -dr com.apple.quarantine /Applications/ImpAgent.app
```

You won’t have to do it again: the browser puts the quarantine flag on the downloaded file,
and the app downloads its updates itself.

Install it into `/Applications` specifically — otherwise the updater has nowhere to write the
new version.

## Windows

Download `ImpAgent Setup <version>.exe`. The installer isn’t signed, so SmartScreen will show
a blue “Windows protected your PC” window — click “More info”, then “Run anyway”. No
administrator rights needed.

## Updates

The app checks for new versions on its own and offers to install them in one click.
Installing means a restart: an unfinished turn is interrupted, your conversations stay where
they are.

## License

Verification is **offline** — the app needs neither a license server nor an internet
connection to run. The machine code is shown on the activation screen (the “Скопировать”
button copies it) and in settings, on the “Лицензия” tab — the interface is in Russian, so
these are the labels you’ll see. A license is valid through the stated date inclusive; you can
renew it in advance, without waiting for it to lock.
