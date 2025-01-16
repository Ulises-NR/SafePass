"use client";

import PasswordService from "@/services/password-manager.service";
import Link from "next/link";
import { useEffect } from "react";
import { useSearch } from "@/hooks/use-search";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/store";
import { Button } from "@/components/ui/button";
import { PasswordGenerator } from "./components/generate-password";
import { PasswordCard } from "./components/password-card";
import { PasswordPagination } from "./components/password-pagination";
import { getAll } from "@/store/slices/passwordSlice";

const PasswordManager = () => {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const { passwords, page, pages } = useAppSelector(
    (state) => state["password-manager"]
  );
  const dispatch = useAppDispatch();
  const { handlePageChange } = useSearch();

  useEffect(() => {
    async function fetch() {
      if (!user) return;

      const res = await PasswordService.getPasswords(user.uid);

      dispatch(getAll(res));
    }

    fetch();
  }, [dispatch, user]);

  if (!user && !loading) {
    return router.push("/auth/signin");
  }

  if (user && !loading) {
    return (
      <>
        <section className="my-8 p-2 container mx-auto flex items-center justify-between">
          <h2>Aqui van a ir los filtros</h2>
          <div className="flex items-center gap-x-2">
            <PasswordGenerator />
            <Button asChild>
              <Link href="/password-manager/create">Create</Link>
            </Button>
          </div>
        </section>

        <main>
          {passwords.length === 0 && (
            <h2 className="text-center text-2xl font-semibold text-gray-700">
              Still nothing was added, try adding data.
            </h2>
          )}

          {passwords.length > 0 && (
            <>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 container mx-auto gap-4 p-2">
                {passwords.map((password: any) => (
                  <PasswordCard password={password} key={password.id} />
                ))}
              </div>
              <PasswordPagination
                currentPage={page}
                totalPages={pages}
                handlePageChange={handlePageChange}
              />
            </>
          )}
        </main>
      </>
    );
  }
};

export default PasswordManager;
