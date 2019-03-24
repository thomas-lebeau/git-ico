workflow "Build and Release" {
  on = "push"
  resolves = ["Release"]
}

action "Install" {
  uses = "actions/npm@master"
  args = "ci"
}

action "Build" {
  uses = "actions/npm@master"
  needs = ["Install"]
  args = "run build"
}

action "Master branch" {
  uses = "actions/bin/filter@master"
  needs = ["Build"]
  args = "branch master"
}

action "Release" {
  uses = "actions/npm@master"
  needs = ["Master branch"]
  args = "run release"
  secrets = ["NPM_TOKEN", "GITHUB_TOKEN"]
}
