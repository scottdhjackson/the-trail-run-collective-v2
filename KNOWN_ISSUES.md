# Known Issues

## Sanity Studio Build Error (React Compiler Runtime)

**Issue**: The production build fails with `Module not found: Can't resolve 'react/compiler-runtime'`.

**Cause**: Sanity v5 packages (`@portabletext/editor`, `sanity`, etc.) were compiled with the React Compiler, which produces code that requires `react/compiler-runtime`. This module is not included in standard React 19 releases yet.

**Status**: This is a known issue with Sanity v5 and will be resolved in future Sanity releases.

**Workarounds**:

### Option 1: Use Hosted Sanity Studio (Recommended for Production)

Instead of embedding the Studio at `/studio`, use Sanity's hosted Studio:

1. Deploy your Sanity Studio separately:
   ```bash
   npm run sanity deploy
   ```

2. Remove the embedded Studio route:
   ```bash
   rm -rf app/studio
   ```

3. Remove Studio-related imports from `sanity.config.ts` and `sanity.cli.ts`

4. Access your Studio at `https://your-project.sanity.studio`

This is actually the recommended approach for production deployments anyway, as it:
- Keeps your public site bundle smaller
- Allows Studio updates without redeploying your site
- Provides better security (Studio is behind Sanity's auth)

### Option 2: Development Mode Only

The site works perfectly in development mode:

```bash
npm run dev
```

- Homepage: http://localhost:3000
- Sanity Studio: http://localhost:3000/studio
- All features work (events, payments, forms)

You can use this for local development and content management while using Option 1 for production.

### Option 3: Wait for Sanity Update

Sanity is actively working on React 19 compatibility. Monitor:
- https://github.com/sanity-io/sanity/issues

Once updated, simply run:
```bash
npm update --legacy-peer-deps
```

## Temporary Solution

For now, you can:

1. **Develop locally** with `npm run dev`
2. **Deploy the frontend** to Vercel (without /studio route)
3. **Use hosted Studio** at sanity.studio for content management

The frontend (homepage, events, payments, forms) builds and deploys fine - only the embedded Studio route has issues.

## Frontend-Only Build

If you want to test the production build without the Studio:

1. Comment out or remove `app/studio/[[...tool]]/page.tsx`
2. Run `npm run build`
3. The build will succeed

The frontend functionality (events, Stripe checkout, forms, etc.) works perfectly in production.
