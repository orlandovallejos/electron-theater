# Branch protection

How `main` is protected, and the exact commands used, so the setup can be reproduced or audited.

## Rules

| Rule | Setting |
|---|---|
| Changes go through a pull request | Required |
| Required approvals | **0** (solo project: GitHub doesn't let authors approve their own PRs, so requiring one would block every merge) |
| Admins exempt | **No**, the owner follows the same rules |
| History | Linear; squash merge only |
| Branches after merge | Deleted automatically |
| Force pushes, branch deletion | Blocked |
| Required status checks (CI) | `lint`, `typecheck`, `test`, `build`, `installer`. Not up-to-date with `main` required. `installer` is the wrapper around the `package` job (see below) |

**Self-review convention:** leave a "Comment" review on each PR before merging.

## Commands

Branch protection for `main`:

```bash
cat > protection.json <<'JSON'
{
  "required_status_checks": null,
  "enforce_admins": true,
  "required_pull_request_reviews": {
    "required_approving_review_count": 0,
    "dismiss_stale_reviews": false,
    "require_code_owner_reviews": false
  },
  "restrictions": null,
  "required_linear_history": true,
  "allow_force_pushes": false,
  "allow_deletions": false,
  "required_conversation_resolution": false,
  "lock_branch": false
}
JSON

gh api -X PUT repos/orlandovallejos/movie-mates/branches/main/protection --input protection.json
```

Squash-only merges, and delete branches after merge:

```bash
gh api -X PATCH repos/orlandovallejos/movie-mates \
  -F allow_squash_merge=true -F allow_merge_commit=false -F allow_rebase_merge=false \
  -F delete_branch_on_merge=true
```

Require the CI checks from `.github/workflows/ci.yml` (job names are the check names). Re-run the `PUT`
above with `required_status_checks` set as below (the `PATCH .../required_status_checks` endpoint returns 404
until checks have been enabled once):

```json
"required_status_checks": {"strict": false, "contexts": ["lint", "typecheck", "test", "build", "installer"]}
```

`test` became required once the coverage thresholds passed (#27, fixed in #80).

The installer build (`package`) is skipped on docs-only pull requests, and a skipped job can't be a required
check, so `installer` is required instead: it passes when `package` succeeded or was skipped, and fails
otherwise. Don't require `package` or `changes` directly.

## History

Before this change `main` had "lock branch" (read-only) enabled, which blocked normal merges, so earlier PRs
(#29) needed `gh pr merge --admin`.
