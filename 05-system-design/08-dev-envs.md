# Development Environments

## Nix

Nix is a package manager for Linux and other Unix-like operating systems.

The goal of the "Nix ecosystem" is to create declarative, reproducible development environments.

Nix is a programming language that powers the Nix packaging system.

Why can't packages be declared via some JSON, YAML, or TOML schema? The problem with that lies in the dynamic nature of how Nix configures packages and allows them to be combined.

Nix as a programming language can be thought of as a kind of "JSON, but with functions". **All statements are declarative**--there's no sequential flow of instructions that makes up a Nix package. Instead functions are called that assign values to fields in attribute sets, which in turn may get assigned to other values.

## devenv

Devenv is a tool for building developement environments that is based on Nix and the Nix package manager.

### References

- Nix language
  - <https://nix.dev/manual/nix/2.28/language/>
  - <https://learnxinyminutes.com/nix/>

### Learning Resources

- [Zero to Nix (official tutorial): beginner-friendly path to Nix fundamentals and flakes](https://zero-to-nix.com/)
- [devenv.sh docs: how this repo’s environment is composed, modules, services, and quickstart](https://devenv.sh/docs/)
- [Caddy “Getting Started”: configure and run Caddy; aligns with services/caddy.nix](https://caddyserver.com/docs/getting-started)
- [Caddyfile Tutorial (handy when tweaking Caddy rules)](https://caddyserver.com/docs/caddyfile-tutorial)
- <https://www.youtube.com/watch?v=DN_B4JLtpH0>