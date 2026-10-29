# The task router, chains & worked examples

## The task → engine router (verify per release; test on your images)
| Task | First route | Notes |
|---|---|---|
| Object/person removal (complex mask) | FLUX Kontext/Fill | best raw quality on large/irregular masks |
| Client/agency deliverables | Adobe Firefly | licensed-training + IP indemnification |
| Quick fix inside a design | Canva Magic Eraser/Grab | already in the workflow |
| Conversational multi-step edit | nano-banana | iterate by instruction |
| Background removal (one-off) | Canva/Clipdrop-class | hair/glass QA at 100% |
| Background removal (batch/e-comm) | Claid-class product tools | consistent specs across the set |
| Upscale a REAL photo/product | Topaz-class faithful | local processing; low creativity |
| Upscale art/renders | Magnific-class creative | hallucinated detail is the feature |
| Extend for aspect ratios | Kontext / Firefly / Magic Expand | step-wise; safe zones |
| Restore old photos | scan high-DPI → repair → faithful upscale + face recovery | identity drift care |

> **creator-publish note:** Routes in this library (equal choices, whichever is connected) (the rest of the table is craft knowledge
> with human steps):
>
> | Task | Route here | Notes |
> |---|---|---|
> | Background removal | Higgsfield `remove_background`, Canva remove-background via `canva:canva`, or another connected remover | hair/glass QA at 100% |
> | Upscale | Higgsfield `upscale_image` or another connected upscaler | confirm faithful vs creative mode in the provider's docs |
> | Extend / outpaint | Higgsfield `outpaint_image` or FLUX.2 Pro Outpaint (BFL or Higgsfield) | params from the provider's schema |
> | Masked inpaint / replace | Nano Banana editing or Flux Kontext (Gemini/BFL API or Higgsfield) | params from the provider's schema |
> | Conversational multi-step edit | Nano Banana (Gemini API or Higgsfield) | iterate by instruction |
> | Restyle from a reference | OpenAI image edits (optionally the `openai-image` skill's `--input` mode, if installed) | check billing first |

## The canonical multi-fix chain (order matters)
Best source (reshoot beats repair) → repairs/inpainting at native res → background/object edits → **then**
upscale (faithful for real; creative for art) → master as PNG/TIFF → platform derivatives → the downstream publishing step.
Low-res source? Upscale FIRST so inpainting has context, then finish.

> **creator-publish note:** Publishing/scheduling is a downstream step outside this skill (a future
> creator-publish posting skill).

## The social aspect-ratio expand (the everyday use)
1:1 hero → outpaint to 9:16 (Stories/Reels) + 16:9 (YouTube) in steps, subject intact, matched grain/light,
platform safe zones respected. Expanded regions are generated: fine for backgrounds, never for
product/scene elements that change what's being claimed.

## The per-image QA card (run at 100% zoom)
Edges/halos ✓ · light + shadow direction ✓ · perspective/scale of replacements ✓ · faces (eyes/teeth/skin) ✓ ·
in-image text legible + true ✓ · batch consistency ✓ · identity vs original (face work) ✓ · watermark/
provenance intact ✓ · disclosure applied where required ✓.

## Worked example A — "Blunt indie founder" (the faithful-vs-creative catch)
"upscaled our product shots with the flashy creative upscaler. looked incredible — until i noticed it invented
stitching our bag doesn't have. that's not sharpening, that's a fake product photo. redid the set in faithful
mode: less wow, zero lies. creative mode now lives where it belongs — the blog's illustration art." — the
hallucination trap caught, routed correctly.

## Worked example B — "Warm bookkeeping studio" (the restoration)
"We restored a photo of our founder's mother for the studio's anniversary post — scanned it big, repaired the
crease, and kept the face enhancement gentle. On the strong setting she looked... almost her, which felt wrong.
Her daughter judged the final, not us. One small step: when restoring someone real, compare every version to
the original at full zoom — the person who knew them decides." — conservative face work, human judgment,
identity respect.

## Never
Use creative upscaling on product/documentary images · conceal real defects · undisclosed body retouching in
label-required markets · remove watermarks or strip provenance · let chained edits drift a real face ·
re-typeset-worthy text through an upscaler · ship without the 100% QA pass · claim the publishing step edits images.

> **creator-publish note:** Also never: send an edit prompt with parameters that are not in the chosen provider's
> schema.
