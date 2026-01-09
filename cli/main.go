package main

import (
	"flag"
	"fmt"
	"os"
	"os/signal"
	"time"
)

func main() {
	duration := flag.Int("d", 30, "")
	flag.Usage = func() {
		fmt.Fprintf(os.Stderr, "drift - https://drift.blog\n\n")
		fmt.Fprintf(os.Stderr, "A pause between impulse and action.\n\n")
		fmt.Fprintf(os.Stderr, "  -d seconds  duration (default 30)\n")
	}
	flag.Parse()

	seconds := *duration
	if seconds < 1 {
		seconds = 30
	}

	// Handle interrupt gracefully
	sig := make(chan os.Signal, 1)
	signal.Notify(sig, os.Interrupt)

	ticker := time.NewTicker(10 * time.Second)
	defer ticker.Stop()

	timeout := time.After(time.Duration(seconds) * time.Second)

	fmt.Printf("Wait %d seconds", seconds)
	fmt.Print(".")

	for {
		select {
		case <-ticker.C:
			fmt.Print(".")
		case <-timeout:
			fmt.Println()
			return
		case <-sig:
			fmt.Println()
			return
		}
	}
}
