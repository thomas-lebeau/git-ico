workflow "Build and Publish" {
  on = "push"
  resolves = ["Build", "Publish"]
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

action "Publish" {
  uses = "actions/npm@master"
  needs = ["Master branch"]
  args = "run release"
  secrets = ["NPM_AUTH_TOKEN"]
}
