# drift

A pause. Nothing else.

## Install

```bash
go install drift@latest
```

Or build from source:

```bash
go build -o drift .
```

## Usage

```bash
drift
```

Wait 30 seconds. A dot appears every 10 seconds so you know it's running. Then it ends.

```bash
drift -d 60
```

Wait 60 seconds instead.

## Cross-compile

Build for all platforms:

```bash
# macOS
GOOS=darwin GOARCH=amd64 go build -o drift-macos-amd64 .
GOOS=darwin GOARCH=arm64 go build -o drift-macos-arm64 .

# Linux
GOOS=linux GOARCH=amd64 go build -o drift-linux-amd64 .
GOOS=linux GOARCH=arm64 go build -o drift-linux-arm64 .

# Windows
GOOS=windows GOARCH=amd64 go build -o drift-windows-amd64.exe .
```

## Philosophy

Type `drift` when you notice yourself reaching for distraction. Nothing happens. That's the point.

No configuration. No blocklists. No judgment. Just a gap between impulse and action.

Eventually, you won't need it.
