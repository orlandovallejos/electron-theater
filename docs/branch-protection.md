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
| Required status check (CI) | **Pending**, to be added once #21 creates the workflow |

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

gh api -X PUT repos/orlandovallejos/electron-theater/branches/main/protection --input protection.json
```

Squash-only merges, and delete branches after merge:

```bash
gh api -X PATCH repos/orlandovallejos/electron-theater \
  -F allow_squash_merge=true -F allow_merge_commit=false -F allow_rebase_merge=false \
  -F delete_branch_on_merge=true
```

Once the CI workflow exists (#21), require its check. Replace `<check-name>` with the job name:

```bash
gh api -X PATCH repos/orlandovallejos/electron-theater/branches/main/protection/required_status_checks \
  -F strict=true -f 'contexts[]=<check-name>'
```

If protection has no status checks yet, that call returns 404; use the `PUT` above with
`"required_status_checks": {"strict": true, "contexts": ["<check-name>"]}` instead.

## History

Before this change `main` had "lock branch" (read-only) enabled, which blocked normal merges, so earlier PRs
(#29) needed `gh pr merge --admin`.
