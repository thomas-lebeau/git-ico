workflow "Build and Publish" {
  on = "push"
  resolves = ["Publish"]
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
  uses = "hyper-expanse/semantic-deliver-action@master"
  needs = ["Master branch"]
  secrets = ["GITHUB_TOKEN"]
}

action "Publish" {
  uses = "actions/npm@master"
  needs = ["Release"]
  args = "run release"
  secrets = ["NPM_TOKEN"]
}
