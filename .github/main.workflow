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

action "Publish" {
  uses = "actions/npm@master"
  needs = ["Master branch"]
  args = "run release"
}
